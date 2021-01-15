import { BidsService } from './../../../services/bids.service';
import { AuctionBidData, BidModel } from './../../../models/bid-model';
import { environment } from './../../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionModel } from './../../../models/auction-model';
import { CookieService } from 'ngx-cookie-service';
import { AuctionsService } from './../../../services/auctions.service';
import { DialogData } from './../../../ui/model/dialog-data';
import { DialogService } from './../../../ui/dialog.service';
import { errorModel, validationConstrains } from './../../../models/user-model';
import { AccountService } from './../../../services/account.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
})
export class AuctionComponent implements OnInit {
  auction: AuctionModel;
  Maxbid: BidModel;
  Minbid: BidModel;
  bid: BidModel;
  bids: BidModel[];
  setDataPoints = [];
  price: number;
  //bidAuctionGraphData: AuctionBidData;
  error: errorModel;
  bidAuctionGraphData: AuctionBidData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private cookieService: CookieService,
    private account: AccountService,
    private router: Router,
    private bidService: BidsService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.auctionService.getAuction(id).toPromise();
    this.auctionService.subjectAuctions.subscribe((auctions) => {
      this.auction = auctions.map((auc) => {
        return {
          ...auc,
          imageFileName: environment.devUrl + 'uploads/' + auc.imageFileName,
        };
      })[0];
      this.price = parseFloat(this.auction.price);
      this.bid = new BidModel();
      this.bid.offer = this.auction.bidPrice;
    });
    this.bidService.getAllBidsIncludingAuction(id);
    this.bidService.subjectBidsInAuction.subscribe((bids) => {
      this.bids = bids;
      if (bids && bids.length > 1) {
        this.bidAuctionGraphData = new AuctionBidData(bids);
      }
    });
  }
  getBids() {
    const id = this.activatedRoute.snapshot.params.id;
    this.bidService.getAllBidsIncludingAuction(id);
  }
  setAmount(event): void {
    this.bid.offer = event.target.value;
  }
  validateBidPrice() {
    let bidsOffer = this.bids.map((bid) => bid.offer);
    return bidsOffer.includes(this.bid.offer);
  }
  validateBid() {
    this.error = new errorModel();
    const bidValidator = new validationConstrains({
      prop: 'bid',
      content: this.bid.offer,
      isReqire: true,
      errorMsg: 'must place bid price',
      pattarn: /^[0-9.]/g,
      pattarnErrorMsg: 'numric only',
      callMethod: this.validateBidPrice.bind(this),
      methodMsg: 'you already made this bid price',
    });
    return this.error.validate(bidValidator);
  }
  addBid() {
    if (this.account.isLogin) {
      if (!this.validateBid()) {
        return;
      }
      const dialog = new DialogData();
      dialog.show = true;
      this.bid.userId = JSON.parse(this.cookieService.get('user')).user._id;
      this.bid.date = new Date();
      this.bid.auctionId = this.auction._id;
      this.bidService.addBid(this.bid).subscribe(
        (result) => {
          console.log(result);
          this.getBids();
          dialog.innerTitle = 'Your bid is absorbed in our system!';
          dialog.text = 'see you in the next auction!';
          this.dialogService.subjectType.next(dialog);
        },
        (err) => {
          console.log(err.message);
          dialog.innerTitle = 'error ';
          dialog.text = err.message;
          this.dialogService.subjectType.next(dialog);
        }
      );
    } else {
      const dialog = new DialogData('Login');
      dialog.title = 'In Order to place this You need to sign in first';
      dialog.show = true;
      this.dialogService.subjectType.next(dialog);
    }
  }

  increament() { }

  showMovie() {
    const dialogMovie = new DialogData('video');
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/' + this.auction.youtubeId;
    this.dialogService.subjectType.next(dialogMovie);
  }

  updateStatusDialog(): void { }
}
