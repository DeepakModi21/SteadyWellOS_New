import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../Core/enviroments/env';
import { User } from '../../../Core/interfaces/auth_interface';
import { PatientData } from '../../../Core/interfaces/Patients_interface';



@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private apiUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getPatients():Observable<PatientData[]>
  {
    return this.http.get<PatientData[]>(`${this.apiUrl}patients/`);
  }

  GetAllUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${this.apiUrl}users/`);
  }

  DeactivateUser(userId: number): Observable<any> {

    return this.http.put(`${this.apiUrl}users/${userId}/deactivate`, {});

  }


  ActivateUser(userId: number): Observable<any> {

    return this.http.put(`${this.apiUrl}users/${userId}/activate`, {});

  }

  ActivatePatients(patient: User): Observable<any> {

    return this.http.put(`${this.apiUrl}patients/${patient.id}/activate`, {});

  }

  DeactivatePatients(patient: User): Observable<any> {

    return this.http.put(`${this.apiUrl}patients/${patient.id}/deactivate`, {});

  }
  
  GetMyPatients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>(`${this.apiUrl}patients/my-patients`);
  }
}
