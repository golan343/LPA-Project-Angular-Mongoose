import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuctionModel } from './../../../models/auction-model';
import { AuctionBidData, BidModel } from './../../../models/bid-model';
import { Pagination } from './../../../models/pagination';

import { AccountService } from './../../../services/account.service';
import { AuctionsService } from './../../../services/auctions.service';
import { BidsService } from './../../../services/bids.service';
import { DialogService } from './../../../ui/dialog.service';
import { environment } from './../../../../environments/environment';
import { DialogData } from 'src/app/ui/model/dialog-data';

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
  paging: Pagination;

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

    this.auctionService.getAuction(id).subscribe(auctions => {
      this.auction =  {
        ...auctions,
        imageFileName: environment.devUrl + 'uploads/' + auctions.imageFileName,
      };
      this.price = parseFloat(this.auction.price);
    });
    this.bidService.getAllBidsIncludingAuction(id);
    this.bidService.subjectBidsInAuction.subscribe(bids => {
      this.bids = bids;
      if (bids && bids.length > 1) {
        this.bidAuctionGraphData = new AuctionBidData(bids);
        this.paging = new Pagination(5, this.bidAuctionGraphData.filteredObjectsArray.length);
      }
    });
  }

  showMovie() {
    const dialogMovie = new DialogData('video');
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/' + this.auction.youtubeId;
    this.dialogService.subjectType.next(dialogMovie);
  }
}

