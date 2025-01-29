import { db, auth } from './config';
import { doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export const createNewStudentDocument = async (user) => {
  if (!user?.email) throw new Error('User email is required');

  try {
    // Create student document
    const studentRef = doc(db, 'students', user.email);
    const studentDoc = await getDoc(studentRef);
    
    let createdData = null;

    // Create student document if it doesn't exist
    if (!studentDoc.exists()) {
      const newStudentData = {
        email: user.email,
        name: user.displayName || '',
        service_hours: 50,
        punishment_hours: 0,
        service_centre_name: '',
        status: ['Not Started'],
        created_at: new Date()
      };
      
      await setDoc(studentRef, newStudentData);
      createdData = newStudentData;
    }

    // Create admin document for the specific email with correct role format
    if (user.email === '023a411@sxc.edu.np') {
      const adminRef = doc(db, 'administrations', user.email);
      const adminData = {
        email: user.email,
        name: user.displayName || 'Developer Admin',
        role: ['Developers']  // Matches the Administrator interface
      };
      await setDoc(adminRef, adminData);  // Removed merge option to ensure correct format
      console.log('Created developer admin access for:', user.email);
    }

    return createdData || studentDoc.data();
  } catch (error) {
    console.error('Error in document creation:', error);
    throw error;
  }
};

// Remove or comment out the createAdministrator function since we're handling it in createNewStudentDocument
// export const createAdministrator = async (email) => { ... }

export const getStudentData = async (email) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  
  if (email !== user.email) {
    // Check if user is an admin
    const adminDoc = await getDoc(doc(db, 'administrations', user.email));
    if (!adminDoc.exists()) {
      throw new Error('Unauthorized access');
    }
  }

  const studentDoc = await getDoc(doc(db, 'students', email));
  return studentDoc.exists() ? studentDoc.data() : null;
};

export const addServiceLog = async (data) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');

  const logRef = doc(collection(db, 'service_logs'));
  await setDoc(logRef, {
    ...data,
    email: user.email,
    date: new Date().toISOString(),
    verified: false
  });
};

export const addVerifiedServiceLog = async (studentEmail) => {
  try {
    // Create a new service log document
    const logRef = doc(collection(db, 'service_logs'));
    await setDoc(logRef, {
      email: studentEmail,
      hours: 10,
      date: new Date().toISOString(),
      verified: true,
      service_centre_name: "Test Centre",
      description: "Test service hours entry"
    });

    console.log('Successfully added 10 verified hours for:', studentEmail);
    return true;
  } catch (error) {
    console.error('Error adding verified hours:', error);
    throw error;
  }
};

export const checkAdministrator = async (email) => {
  try {
    const adminRef = doc(db, 'administrators', email);
    const adminDoc = await getDoc(adminRef);
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking administrator:', error);
    return false;
  }
};

export const setupServiceLogsListener = async (email, onUpdate) => {
  try {
    const q = query(collection(db, 'serviceLogs'), where('studentEmail', '==', email));
    
    return onSnapshot(q, async (snapshot) => {
      let completedHours = 0;
      
      // Calculate total verified completed hours
      snapshot.forEach((doc) => {
        const logData = doc.data();
        if (logData.verified) {
          completedHours += logData.hours;
        }
      });

      // Update student's remaining service hours
      const studentRef = doc(db, 'students', email);
      const studentDoc = await getDoc(studentRef);
      
      if (studentDoc.exists()) {
        const currentData = studentDoc.data();
        const remainingHours = Math.max(0, 50 - completedHours);
        let newStatus = ['Not Started'];
        
        if (remainingHours === 0) {
          newStatus = ['Completed'];
        } else if (completedHours > 0) {
          newStatus = ['Ongoing'];
        }

        // Only update if hours or status have changed
        if (currentData.service_hours !== remainingHours || currentData.status[0] !== newStatus[0]) {
          await setDoc(studentRef, {
            ...currentData,
            service_hours: remainingHours,
            status: newStatus
          }, { merge: true });
        }
      }

      if (onUpdate) {
        onUpdate(completedHours);
      }
    });
  } catch (error) {
    console.error('Error setting up service logs listener:', error);
    throw error;
  }
};

export const getStudentHours = async (email) => {
  try {
    const studentRef = doc(db, 'students', email);
    const studentDoc = await getDoc(studentRef);
    
    if (studentDoc.exists()) {
      return {
        service_hours: studentDoc.data().service_hours,
        punishment_hours: studentDoc.data().punishment_hours,
        status: studentDoc.data().status
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting student hours:', error);
    throw error;
  }
};

export const updateServiceCentre = async (email, centreName) => {
  try {
    const studentRef = doc(db, 'students', email);
    await setDoc(studentRef, {
      service_centre_name: centreName
    }, { merge: true });
  } catch (error) {
    console.error('Error updating service centre:', error);
    throw error;
  }
};
