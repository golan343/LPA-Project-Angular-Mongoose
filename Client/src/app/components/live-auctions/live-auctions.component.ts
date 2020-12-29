import { BaseUrl, environment } from './../../../environments/environment';
import { AuctionModel } from './../../models/auction-model';
import { AuctionsService } from './../../services/auctions.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BidsService } from '../../services/bids.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-auctions',
  templateUrl: './live-auctions.component.html',
  styleUrls: ['./live-auctions.component.css']
})

export class LiveAuctionsComponent implements OnInit, OnDestroy {
  public auctions: AuctionModel[];
  private subscriberBids: Subscription;
  public BaseUrl = BaseUrl;

  constructor(private auctionsService: AuctionsService, private router: Router, private BidsService: BidsService,) { }
  ngOnDestroy(): void {
    this.subscriberBids.unsubscribe();
  }
  ngOnInit() {
    this.auctionsService.getAllAuctions();

    this.subscriberBids = this.auctionsService.subjectAuctions.pipe(map(auctions => {
      this.auctions = auctions.map(auc => {
        return {
          ...auc,
          imageFileName: environment.BaseUrl + 'uploads/' + auc.imageFileName
        }
      }).filter(auc => auc.status);
    })).subscribe(data => {
      console.table(data);
    });
  }

  public showAuction(_id: string): void {
    debugger;
    this.router.navigate(['/auction/', _id]);
  }


}
