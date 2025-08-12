import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Core/enviroments/env';
import { Observable } from 'rxjs';
import { DashboardData, DashboardResponse, UrgentFollowup } from '../../../Core/interfaces/dashboard_summary_interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  private baseUrl=environment.baseUrl;

  GetDashboardSummary():Observable<DashboardData>
  {
     return this.http.get<DashboardData>(`${this.baseUrl}dashboard/summary`)
  }




   getRecentActivity(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.baseUrl}dashboard/recent-activity`)
  }

  getUpcomingCalls(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.baseUrl}dashboard/upcoming-calls`)
  }
getUrgentFollowups(): Observable<UrgentFollowup[]> {
  return this.http.get<UrgentFollowup[]>(`${this.baseUrl}dashboard/urgent-followups`);
}


}
