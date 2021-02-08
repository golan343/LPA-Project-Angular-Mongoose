import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flag-select',
  templateUrl: './flag-select.component.html',
  styleUrls: ['./flag-select.component.css']
})
export class FlagSelectComponent implements OnInit {
  choosenCountry:any;
  list:Array<any>
  show:boolean;
  @Output()
  selectedEvent = new EventEmitter<any>();
  constructor() {
    this.show = false;
   }

  ngOnInit(): void {
    this.list = [
      {
        mexico:true,
        name:'mexico'
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
    this.choosenCountry = this.list[0];

  }
  toogleList(){
    this.show = !this.show;
  }
  selectCountry(item){
    this.choosenCountry = item;
    this.show = false;
  }

}
