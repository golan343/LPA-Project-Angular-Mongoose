import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  sendEmail(email: string): Observable<any> {
    return this.http.post<any>(environment.BaseUrl + '/api/email/sendReset', { email });
  }
}

export interface EmailContent {
  from: string;
  to: string;
  subject: string;
  text: string;
}
