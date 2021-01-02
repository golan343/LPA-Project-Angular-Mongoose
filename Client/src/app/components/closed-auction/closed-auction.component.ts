import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuctionModel } from 'src/app/models/auction-model';
import { AuctionBidData, BidModel } from 'src/app/models/bid-model';
import { AccountService } from 'src/app/services/account.service';
import { AuctionsService } from 'src/app/services/auctions.service';
import { BidsService } from 'src/app/services/bids.service';
import { DialogService } from 'src/app/ui/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-closed-auction',
  templateUrl: './closed-auction.component.html',
  styleUrls: ['../auction/auction.component.css', './closed-auction.component.css']
})
export class ClosedAuctionComponent implements OnInit, OnDestroy {
  auction: AuctionModel;
  price: number;
  bids: BidModel[];
  bidAuctionGraphData: AuctionBidData;

  Maxbid: BidModel;
  Minbid: BidModel;
  subscriberLogin: Subscription;
  isLogin: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private bidService: BidsService,
    public accountService: AccountService,
    private dialogService: DialogService) { }
  ngOnDestroy(): void {
    this.subscriberLogin.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriberLogin = this.accountService.isLoginSubject.subscribe(isLogin => {
      this.isLogin = isLogin
    });
    const id = this.activatedRoute.snapshot.params.id;

    this.auctionService.getAuction(id).toPromise();
    this.auctionService.subjectAuctions.subscribe(auctions => {
      this.auction = auctions.map(auc => {

        return {
          ...auc,
          imageFileName: environment.BaseUrl + 'uploads/' + auc.imageFileName
        }
      })[0];
      this.price = parseFloat(this.auction.price);
    });
    //this.bid.auctionId = id;
    this.bidService.getAllBidsIncludingAuction(id);
    this.bidService.subjectBidsInAuction.subscribe(bids => {
      this.bids = bids;
      if (bids && bids.length > 1) {
        this.bidAuctionGraphData = new AuctionBidData(bids);
      }
    });
  }

}
