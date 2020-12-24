import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  bid: BidModel;
  constructor(private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private bidService: BidsService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    debugger;

    this.auctionService.getAuction(id);
    this.auctionService.subjectAuctions.subscribe(auctions => {
      this.auction = auctions.map(auc => {
        return {
          ...auc,
          imageFileName: environment.BaseUrl + 'uploads/' + auc.imageFileName
        }
      })[0];
      this.price = parseFloat(this.auction.price);
    });
  }

}
