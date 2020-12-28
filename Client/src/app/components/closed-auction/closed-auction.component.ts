import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuctionModel } from 'src/app/models/auction-model';
import { BidModel } from 'src/app/models/bid-model';
import { AuctionsService } from 'src/app/services/auctions.service';
import { BidsService } from 'src/app/services/bids.service';
import { DialogService } from 'src/app/ui/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-closed-auction',
  templateUrl: './closed-auction.component.html',
  styleUrls: ['../auction/auction.component.css', './closed-auction.component.css']
})
export class ClosedAuctionComponent implements OnInit {
  auction: AuctionModel;
  price: number;
  bids: BidModel[];
  bidOfferUnique;
  unique;
  highest;
  common;
  constructor(private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private bidService: BidsService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
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
      debugger;
      this.bids = bids;
    })
  }
  // checkUnique() {
  //   if (!this.bids) return;
  //   if (this.bids.length > 0) {
  //     let uniqueValue = 1000;
  //     let highestValue = 0;
  //     let commonValue = 0;
  //     for (let i = 1; i <= 100; i++) {
  //       const bidOffer = i / 100;
  //       const value = this.bids.filter(b => +b.offer === bidOffer).length;

  //       if (value > 0) {
  //         if (value < uniqueValue) {
  //           uniqueValue = value;
  //           this.bidOfferUnique = bidOffer;
  //         }
  //         if (bidOffer > highestValue) {
  //           highestValue = bidOffer;
  //         }
  //       }
  //       if (value > commonValue) {
  //         commonValue = value;
  //         this.common = bidOffer;
  //       }
  //     }
  //     this.unique = this.bids.find(b => b.offer === `${this.bidOfferUnique}`);
  //     this.highest = this.bids.find(b => b.offer === `${highestValue}`);
  //     console.log(this.unique);
  //   }
  //   return;
  // }
}
