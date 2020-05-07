import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Appointment } from  '../services/appointment.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:3600";
  
  constructor(private httpClient: HttpClient) {

  }

  createAppointment(appointment: Appointment): Observable<Appointment>{
    return this.httpClient.post<Appointment>(`${this.PHP_API_SERVER}/api/index.php`, appointment);
  }
}
