import { BaseUrl, environment } from './../../../../environments/environment';
import { AuctionModel } from './../../../models/auction-model';
import { AuctionsService } from './../../../services/auctions.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BidsService } from '../../../services/bids.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-live-auctions',
  templateUrl: './live-auctions.component.html',
  styleUrls: ['./live-auctions.component.css']
})

export class LiveAuctionsComponent implements OnInit, OnDestroy {
  public auctions: AuctionModel[];
  public auctions$: Observable<AuctionModel[]>;
  public BaseUrl = BaseUrl;

  constructor(private auctionsService: AuctionsService, private router: Router, private BidsService: BidsService,) { }
  ngOnDestroy(): void {

  }
  ngOnInit() {
    this.auctionsService.getAllAuctions();

    this.auctions$ = this.auctionsService.subjectAuctions.asObservable().pipe(map<AuctionModel[], any>(auctions => {
      return auctions.map(auc => {
        return {
          ...auc,
          imageFileName: environment.devUrl + 'uploads/' + auc.imageFileName
        }
      }).filter(auc => auc.status);
    }))
    this.auctions$.subscribe(res => {
      console.table(res);
    });
  }

  public showAuction(_id: string): void {
    this.router.navigate(['/auction/', _id]);
  }


}
