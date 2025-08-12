import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Core/enviroments/env';
import { Observable } from 'rxjs/internal/Observable';
import { Call } from '../../../Core/interfaces/dashboard_summary_interfaces';
import { PatientData } from '../../../Core/interfaces/Patients_interface';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getTodaysCalls(): Observable<Call[]> {
    return this.http.get<Call[]>(`${this.baseUrl}calls/today`);
  }

  getCalls(params?: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}calls/`, { params });
  }

  getCallDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}calls/${id}`);
  }

    getPatients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>(`${this.baseUrl}patients/`);
  }

   scheduleCall(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}calls/`, payload);
  }
 updateCall(callId: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}calls/${callId}`, payload);
  }
   getNurses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}users/?role=nurse`);
  }
}
