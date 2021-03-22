import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuctionModel } from './../../../models/auction-model';
import { AuctionsService } from './../../../services/auctions.service';
import { BaseUrl, environment } from 'src/environments/environment';
import { BidsService } from './../../../services/bids.service'
import { DialogData } from 'src/app/ui/model/dialog-data';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit, OnDestroy {
  public auctions: AuctionModel[];
  private subscriberBids: Subscription;
  public BaseUrl = BaseUrl;

  constructor(private auctionsService: AuctionsService, private router: Router, private BidsService: BidsService) { }
  ngOnDestroy(): void {
    this.subscriberBids.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.auctionsService.getAllAuctions();

    this.subscriberBids = this.auctionsService.subjectAuctions.pipe(map(auctions => {
      this.auctions = auctions.map(auc => {
        return {
          ...auc,
          imageFileName: environment.devUrl + 'uploads/' + auc.imageFileName
        }
      }).filter(auc => !auc.status);
    })).subscribe(data => {
      console.table(data);
    });
  }

  public showAuction(_id: string): void {
    this.router.navigate(['/auction/', _id]);
  }
 

}

