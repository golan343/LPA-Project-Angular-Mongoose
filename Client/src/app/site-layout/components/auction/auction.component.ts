import { BidsService } from './../../../services/bids.service';
import { AuctionBidData, BidModel } from './../../../models/bid-model';
import { environment } from './../../../../environments/environment';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionModel } from './../../../models/auction-model';
import { AuctionsService } from './../../../services/auctions.service';
import { DialogData } from './../../../ui/model/dialog-data';
import { DialogService } from './../../../ui/dialog.service';
import { errorModel, validationConstrains } from './../../../models/user-model';
import { AccountService } from './../../../services/account.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionComponent implements OnInit, OnDestroy {
  auctionObservable$ = new Observable<AuctionModel>();
  auctionSubscriber: Subscription;
  auction: AuctionModel;
  Maxbid: BidModel;
  Minbid: BidModel;
  bid: BidModel;
  bids: BidModel[];
  setDataPoints = [];
  price: number;
  bidsRange = new Array<string>();
  youtubeLink;
  //bidAuctionGraphData: AuctionBidData;
  error: errorModel;
  bidAuctionGraphData: AuctionBidData;
  suggests: { up: number, down: number };
  constructor(
    private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private account: AccountService,
    private bidService: BidsService,
    private dialogService: DialogService
  ) { }
  ngOnDestroy(): void {
    if(this.auctionSubscriber)
    this.auctionSubscriber.unsubscribe();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.auctionObservable$ =  this.auctionService.getAuction(id);
  
    this.bidService.getAllBidsIncludingAuction(id);
    this.bidService.subjectBidsInAuction.subscribe((bids) => {
      this.bids = bids;
      this.auctionSubscriber = this.auctionObservable$.subscribe((auctions) => {
        this.auction =  {
            ...auctions,
            imageFileName: environment.devUrl + 'uploads/' + auctions.imageFileName,
            bidPattern: auctions.bidPattern || "0.5",
            bidsRemains: Number(auctions.totalBids) - Number(auctions.bidsCount)
          };
        console.log(this.auction.bidsRemains);
        this.price = parseFloat(this.auction.price);
        this.bid = new BidModel();
        this.bid.offer = this.auction.bidPrice;
      });
     
    });

    if(this.auction){
      this.youtubeLink = 'https://www.youtube.com/embed/' + this.auction.youtubeId;
      console.log(this.youtubeLink);
    }
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
      const user = this.account.getUser();
      this.bid.userId = user._id;
      this.bid.date = new Date();
      this.bid.auctionId = this.auction._id;
      this.bidService.addBid(this.bid).subscribe(
        (result) => {
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
  chooseTop() {
    this.bid.offer = this.suggests.up + '';
    this.suggests = null;
    this.error.clear("bid");
  }
  chooseDown() {
    this.bid.offer = this.suggests.down + '';
    this.suggests = null;
    this.error.clear("bid");
  }
  preventValue($event: KeyboardEvent) {
    let reg = /^[0-9.]/g;
    let key = $event.key;
    return reg.test(key) || /(Delete)|(Backspace)/gs.test(key);
  }

  /**
   * bind on key down event to validate its number 
   * @param reaguments bid bounce and event target
   */
  calcValue(arg: any) {
    let price = parseFloat(arg[0].target.value);
    this.error = new errorModel();
    let bidPattern = arg[1] || 1;
    if (!price || !bidPattern) {
      this.error.bid = 'This value is Empty To Apply the bid fill up the price';
      return false;
    }
    
    let decimal = 1;
    let counter = 0;
    while (bidPattern / decimal < 1) { decimal /= 10; counter++; }
    if (`${price}`.includes('.')) {
      if (`${price}`.split('.')[1].length > counter) {
        this.error.bid = 'This Value has to be divided to ' + bidPattern;
        return false;
      }
    }
    let res = Math.fround(price / bidPattern) % 1;

    if (res !== 0) {
      this.error.bid = 'This value has to be Multiples  of the value ' + bidPattern + ' you can choose one the suggestions beside';

      let up = price;
      let down = price;

      while (up / bidPattern % 1 !== 0) { up = parseFloat((up + decimal).toFixed(2)); }
      while (down / bidPattern % 1 !== 0 && down > 0) { down = parseFloat((down - decimal).toFixed(2)); }
      this.suggests = { down, up };

    } else {
      this.suggests = null;
    }

  }

  randomSuggestions(){
    let bidBounce = parseFloat(this.auction.bidPattern);
    this.bid.offer = (Math.floor(100*Math.random())* bidBounce).toFixed(2);
  }

  showMovie() {
    const dialogMovie = new DialogData('video');
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/' + this.auction.youtubeId;
    this.dialogService.subjectType.next(dialogMovie);
  }

  updateStatusDialog(): void {

  }
}
