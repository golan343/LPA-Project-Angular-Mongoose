import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.css']
})
export class SwitchButtonComponent implements OnInit {
  left = false;
  @Input()
  leftText = '';
  @Input()
  rightText = '';
  @Output()
  observeToggleEvent = new EventEmitter(false);
  constructor() { }

  ngOnInit(): void {
  }
  leftClick(){
    this.left = true;
    this.observeToggleEvent.next(this.left);
  }
  rightClick(){
    this.left = false;
    this.observeToggleEvent.next(this.left);
  }
}
