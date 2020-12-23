import { Component, OnInit } from '@angular/core';
import { DialogService } from './../dialog.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  title: string;
  text: string;
  show: boolean;
  wide: boolean;
  component: string;
  constructor(private dialogService: DialogService) {
  }
  escape($event) {
    if ($event.keyCode === 27) {
      this.close();
    }
  } 
  ngOnInit(): void {
    this.dialogService.subjectType.subscribe(arg => {
      this.component = arg.componentName;
      this.text = arg.text;
      this.title = arg.title;
      this.show = !!arg.componentName;;
      this.wide = arg.wide;
      window.addEventListener('keydown', this.escape);
    });
  }
  close() {
    this.show = false;
    this.title = '';
    this.text = '';
    this.component = '';
    window.removeEventListener('keydown', this.escape);
  }

}
