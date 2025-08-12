export interface Call {
  id: string;
  dateTime: Date;
  patient: string;
  callType: string;
  status: string;
  duration?: string;
  conductedBy?: string;
}
export interface CallType {
  id: string;
  name: string;
}

export interface ConductedByUser {
  id: number;
  full_name: string;
}



export interface ScheduleCallRequest {
  patient_id: number;
  scheduled_time: string;
  call_type: string;
  notes: string;
  // conducted_by:string;
}
