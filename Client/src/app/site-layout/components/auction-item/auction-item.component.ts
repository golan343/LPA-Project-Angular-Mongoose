import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from './../../../models/auction-model';
import { AccountService } from './../../../services/account.service';
import { DialogService } from '../../../ui/dialog.service';

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
  constructor(private router: Router,
    private account: AccountService,
    private dialogLocalsService: DialogService) { }

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
