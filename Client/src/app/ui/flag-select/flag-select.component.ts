import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag-select',
  templateUrl: './flag-select.component.html',
  styleUrls: ['./flag-select.component.css']
})
export class FlagSelectComponent implements OnInit {
  flag:any;
  list:Array<any>
  show:false;
  constructor() { }

  ngOnInit(): void {
    this.list = [
      {
        usa:true,
        name:'usa'
      },
      {
        ecuador:true,
        name:'ecuador'
      },
      {
        brazil:true,
        name:'brazil'
      }
    ];
    this.flag = this.list[0];

  }

}
