import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Core/enviroments/env';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // addPatient(patientData: { first_name: any; last_name: any; email: any; username: any; password: any; phone_number: any; userType: any; mrn: any; date_of_birth: any; gender: any; address: any; primary_diagnosis: any; secondary_diagnoses: any; protocol_type: any; primary_nurse_id: any; emergency_contact_name: any; emergency_contact_phone: any; emergency_contact_relationship: any; advance_directive: any; advance_directive_status: any; dnr_status: any; allergies: any; notes: any; }) {
  //   throw new Error('Method not implemented.');
  // }

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

addUser(formData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}users/`, formData);
}

 addPatient(formData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}patients/`, formData);
}

 updateUser( nurseId:number, nurseData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}users/${nurseId}`, nurseData);
  }
  
  updatePatient(patientId: number, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/${patientId}`, patientData);
  }

  getUserbyId(UserId:number)
  {
     return this.http.post(`${this.baseUrl}users${UserId}`,{});
  }

  
}