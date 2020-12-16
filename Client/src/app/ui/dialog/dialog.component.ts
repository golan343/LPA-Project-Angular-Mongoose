import { Component, Injector, OnInit, Type } from '@angular/core';
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
  component: string;
  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.dialogService.subjectType.subscribe(arg => {
      this.component = arg.componentName;
      this.text = arg.text;
      this.title = arg.title;
      this.show = true;
    });
  }
  close() {
    this.show = false;
    this.title = '';
    this.text = '';
    this.component = '';
  }

}
