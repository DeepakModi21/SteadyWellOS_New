export interface DashboardData {
  assessments: {
    this_week: number;
    urgent_followups: number;
  };
  calls: {
    completed_today: number;
    pending: number;
    today: number;
  };
  patients: {
    active: number;
    total: number;
    by_protocol: {
      cancer: number;
      copd: number;
      fit: number;
      general: number;
      heart_failure: number;
    };
  };
}
export interface Assessment {
  follow_up_needed: boolean;
  id: number;
  patient_id: number;
  patient_name: string;
  protocol_type: string;
  timestamp: string;
}

export interface Call {
status: any;
patient: any;
dateTime: string|number|Date;
  call_type: string;
  duration: number;
  id: number;
  patient_id: number;
  patient_name: string;
  timestamp: string;
}

export interface DashboardResponse {
  data: never[];
  assessments: Assessment[];
  calls: Call[];

}


export interface ActivityItem {
  type: 'call' | 'assessment';
  id: number;
  patientName: string;
  title: string;
  description: string;
  timestamp: string;
  formattedTime: string;
  formattedDate: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  followUpNeeded?: boolean;
  protocolType?: string;
  duration?: number;
}


export interface UrgentFollowup {
  id: number;
  patient_id: number;
  patient_name: string;
  protocol_type: string;
  assessment_date: string;
  follow_up_date: string | null;
}
