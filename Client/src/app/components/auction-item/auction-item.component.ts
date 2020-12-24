import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { AccountService } from 'src/app/services/account.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { environment } from 'src/environments/environment';
import { AuctionsService } from '../../services/auctions.service';

import { DialogService } from '../../ui/dialog.service';

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
    if (this.account.isLogin) {
      if (this.auction.status) {
      this.router.navigateByUrl('/auctions/' + _id);
      } else {
        this.router.navigateByUrl('/closed-auction/' + _id);
      }
    } else {
      const dialog = new DialogData('Login');
      dialog.text = "In Order to place this You need to sign in first";
      dialog.show = true;
      this.dialogLocalsService.subjectType.next(dialog);
    }

  }

}
