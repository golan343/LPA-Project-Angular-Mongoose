import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { autoComplete, County } from './autoComplete';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  autoComp: autoComplete;
  constructor(private http: HttpClient) { }

  getCountries(): Observable<autoComplete> {
    return this.http.get<any>(environment.BaseUrl + 'api/info/countries').pipe<autoComplete>(map(result => {
      return new autoComplete(result);
    }));
  }
}
