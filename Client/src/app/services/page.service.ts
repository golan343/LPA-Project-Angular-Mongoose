import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment'
import { Observable } from 'rxjs';
import { pageModel } from '../models/page';
@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }
  getPage(pageName:string):Observable<pageModel>{
    return this.http.get<pageModel>(environment.BaseUrl+'api/page/'+pageName);
  }
}
