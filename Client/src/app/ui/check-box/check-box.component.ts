import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()
  checked: boolean;
  constructor() { }
  @Output()
  triggerChange = new EventEmitter();
  ngOnInit(): void {
  }
  clickCheckbox() {
    this.checked = !this.checked;
    this.triggerChange.next(this.checked);
  }

}
