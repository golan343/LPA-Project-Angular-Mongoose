import { BaseUrl } from './../../../environments/environment';
import { store } from './../../redux/store';
import { AuctionModel } from './../../models/auction-model';
import { AuctionsService } from './../../services/auctions.service';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-auctions',
  templateUrl: './live-auctions.component.html',
  styleUrls: ['./live-auctions.component.css']
})

export class LiveAuctionsComponent implements OnInit {
  public auctions: AuctionModel[];
  private unsubscribe: Unsubscribe;
  public BaseUrl = BaseUrl;

  constructor(private auctionsService: AuctionsService, private router: Router) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.auctions = store.getState().auctions;
    });
    if (store.getState().auctions.length > 0) {
      this.auctions = store.getState().auctions;
    }
    else {
      try {
        await this.auctionsService.getAllAuctions();
      }
      catch (err) {
        alert(err.message);
      }
    }
  }

  // tslint:disable-next-line: variable-name
  public showAuction(_id: string): void {
    this.router.navigateByUrl('/auctions/' + _id);

  }

}
