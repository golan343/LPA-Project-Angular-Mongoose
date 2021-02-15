import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from './../../../models/auction-model';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {
  @Input()
  auction: AuctionModel;
  @Input()
  homeFlag: string;
  @Input()
  placeBisText = 'Place my bid';
  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  showAuction(_id: string): void {

    if (this.auction.status) {
      this.router.navigateByUrl('/auction/' + _id);
    } else {
      this.router.navigateByUrl('/closed-auction/' + _id);
    }


  }

}
