import { BidsService } from './../../services/bids.service';
import { AuctionBidData, BidModel } from './../../models/bid-model';
import { environment } from './../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { CookieService } from 'ngx-cookie-service';
import { AuctionsService } from 'src/app/services/auctions.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from 'src/app/ui/dialog.service';
import { errorModel, validationConstrains } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
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
    private accountService: AccountService,
    private route: Router,
    private bidService: BidsService,
    private dialogService: DialogService) { }

  ngOnInit() {
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
      this.bid = new BidModel();
      this.bid.offer = this.auction.bidPrice;
    });
    this.bidService.getAllBidsIncludingAuction(id);
    this.bidService.subjectBidsInAuction.subscribe(bids => {
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
    let bidsOffer = this.bids.map(bid => bid.offer);
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
      methodMsg: 'you already made this bid price'
    });
    return this.error.validate(bidValidator);
  }
  async addBid(): Promise<any> {
    if (!this.accountService.isLogin) {
      this.route.navigate(['/']);
    }
    if (!this.validateBid()) {
      return;
    }
    const dialog = new DialogData();
    dialog.show = true;
    this.bid.userId = JSON.parse(this.cookieService.get('user')).user._id;
    this.bid.date = new Date();
    this.bid.auctionId = this.auction._id;
    this.bidService.addBid(this.bid).subscribe(result => {
      console.log(result)
      this.getBids();
      dialog.innerTitle = 'Your bid is absorbed in our system!';
      dialog.text = 'see you in the next auction!';
      this.dialogService.subjectType.next(dialog);
    },
      err => {
        console.log(err.message);
        dialog.innerTitle = 'error ';
        dialog.text = err.message;
        this.dialogService.subjectType.next(dialog);
      });;
  }

  increament() {
  }


  showMovie() {
    const dialogMovie = new DialogData("video");
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/J25xNqa-knI';
    this.dialogService.subjectType.next(dialogMovie);

  }

  updateStatusDialog(): void {
  }

}
