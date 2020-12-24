import { Component, OnInit } from '@angular/core';
import { DialogData } from '../model/dialog-data';
import { DialogService } from './../dialog.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialogData: DialogData;
  constructor(private dialogService: DialogService) {
  }
  escape($event) {
    if ($event.keyCode === 27) {
      this.close();
    }
  } 
  ngOnInit(): void {
    this.dialogService.subjectType.subscribe(arg => {
      this.dialogData = arg;
      window.addEventListener('keydown', this.escape);
    });
  }
  close() {
    this.dialogData = new DialogData();
    window.removeEventListener('keydown', this.escape);
  }

}
