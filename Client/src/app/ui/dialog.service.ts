import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogData } from './model/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  subjectType = new Subject<DialogData>();
  constructor() {

  }
  method() { }
}
