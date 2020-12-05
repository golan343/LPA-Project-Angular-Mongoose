import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { AuctionModel } from 'src/app/models/auction-model';
import { store } from 'src/app/redux/store';
import { AuctionsService } from 'src/app/services/auctions.service';
import { BaseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {
  public auctions: AuctionModel[];
  private unsubscribe: Unsubscribe;
  public BaseUrl = BaseUrl;



  constructor(private auctionsService: AuctionsService, private router: Router) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.auctions = store.getState().auctions.filter(a => a.status === false);
    });
    if (store.getState().auctions.length > 1) {
      this.auctions = store.getState().auctions.filter(a => a.status === false);

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
