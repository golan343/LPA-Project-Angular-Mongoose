import { Component, Input, OnInit } from '@angular/core';
import { errorModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-error-bubble',
  templateUrl: './error-bubble.component.html',
  styleUrls: ['./error-bubble.component.css']
})
export class ErrorBubbleComponent implements OnInit {
  @Input()
  errorMsg:string;
  constructor() {
  }

  ngOnInit(): void {

  }

}
