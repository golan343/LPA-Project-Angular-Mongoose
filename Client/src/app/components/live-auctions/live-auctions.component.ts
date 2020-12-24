import { BaseUrl, environment } from './../../../environments/environment';
import { AuctionModel } from './../../models/auction-model';
import { AuctionsService } from './../../services/auctions.service';
import { Component, OnInit } from '@angular/core';
import { BidsService } from '../../services/bids.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-auctions',
  templateUrl: './live-auctions.component.html',
  styleUrls: ['./live-auctions.component.css']
})

export class LiveAuctionsComponent implements OnInit {
  public auctions: AuctionModel[];
  private subscriberBids: Subscription;
  public BaseUrl = BaseUrl;

  constructor(private auctionsService: AuctionsService, private router: Router, private BidsService: BidsService,) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.auctionsService.getAllAuctions();
    // this.unsubscribe = store.subscribe(() => {
    //   this.auctions = store.getState().auctions.filter(a => a.status === true);


    // });
    // if (store.getState().auctions.length > 1) {
    //   this.auctions = store.getState().auctions.filter(a => a.status === true);
    // }
    // else {
    //   try {
    //     await this.auctionsService.getAllAuctions();
    //   }
    //   catch (err) {
    //     alert(err.message);
    //   }
    // }

    this.auctionsService.subjectAuctions.pipe(map(auctions => {
      this.auctions = auctions.map(auc => {
        return {
          ...auc,
          imageFileName: environment.BaseUrl + 'uploads/' + auc.imageFileName
        }
      });
    })).subscribe(data => {
      console.table(data);
    });
  }

  // tslint:disable-next-line: variable-name
  public showAuction(_id: string): void {
    this.router.navigate(['/auctions/', _id]);

  }


}
