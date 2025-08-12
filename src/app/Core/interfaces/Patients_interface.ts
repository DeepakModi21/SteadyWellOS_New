export interface Nurse {
  id: number;
  full_name: string;
}

export type ProtocolType = 'ProtocolType.CANCER' | 'ProtocolType.COPD' | 'ProtocolType.FIT' | 'ProtocolType.GENERAL';

export interface PatientData {
  id: number;
  full_name: string;
  age: number;
  is_active: boolean;
  mrn: string;
  phone_number: string;
  primary_diagnosis: string;
  primary_nurse: Nurse;
  protocol_type: ProtocolType;
}
