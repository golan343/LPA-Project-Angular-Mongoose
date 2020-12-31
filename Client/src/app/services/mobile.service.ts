import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  showMenuTrigger = new Subject<boolean>();
  cahngeMenuColor = new Subject<any>();
  show: boolean;
  constructor() {

   }
 
}
