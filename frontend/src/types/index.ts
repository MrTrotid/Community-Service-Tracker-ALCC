export interface Administrator {
  email: string;
  name: string;
  role: string[];  // ["Community Service Coordinator", "Coordinator", "Developers"]
}

export interface ServiceLog {
  date: string;
  email: string;
  hours: number;
  service_centre_name: string;
  verified: boolean;
}

export interface Student {
  email: string;
  name: string;
  punishment_hours: number;
  service_centre_name: string;
  service_hours: number;
  status: string[];  // ["Not Started", "Ongoing", "Completed"]
}
