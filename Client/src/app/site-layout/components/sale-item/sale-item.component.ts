import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/ui/dialog.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import {environment} from './../../../../environments/environment';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SaleItemComponent implements OnInit {
  @Input()
  auction:any;
 
  constructor(private cdr:ChangeDetectorRef, private dialogService:DialogService) {

  }

  ngOnInit(): void {
    console.log(this.auction);
    this.auction = {
      ...this.auction,
      imageFileName: environment.devUrl + 'uploads/' + this.auction.imageFileName,
    };
  }
  showSaleInfo(){
    const dialg = new DialogData('sale');
    dialg.dynamicObject = {... this.auction};
    dialg.wide = true;
    this.dialogService.subjectType.next(dialg);
  }

}
