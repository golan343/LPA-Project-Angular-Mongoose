import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { phoneCode } from '../model/phoneCode';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-phones-code',
  templateUrl: './phones-code.component.html',
  styleUrls: ['./phones-code.component.css']
})
export class PhonesCodeComponent implements OnInit, OnDestroy {
  codes:phoneCode[];
  selected:phoneCode;
  initSubscribtion = new Subscription();
  @Output()
  EventPassValue = new EventEmitter();
  constructor(private infoData:UtilsService) { }
  ngOnDestroy(): void {
   if(this.initSubscribtion)
      this.initSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
   this.initSubscribtion =  this.infoData.getPhonesCode().subscribe(codes=>{
      this.codes = codes.map(item=> ({
          ...item,
          dial_code:item.dial_code.replace(/[+-]+/g,'').trim()
        }));
    });
  }
  inputChangeEvent($event: any){
    const codeVal = $event.target.value.replace(/[^0-9]+/g,'');
    this.EventPassValue.next(codeVal);
  }


}

