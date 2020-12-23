import { BaseUrl, environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { store } from 'src/app/redux/store';
import { AuctionsService } from 'src/app/services/auctions.service';
import { AccountService } from 'src/app/services/account.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from '../../ui/dialog.service';
import { BidsService } from '../../services/bids.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public auction: AuctionModel;
  numberOfBids: number;
  numberOfproposal: number;
  subscriberBids: Subscription;
  public BaseUrl = BaseUrl;
  lat = -3.180653;
  lng = -72.467834;

  constructor(
    private router: Router,
    private BidsService: BidsService,
    private auctionService: AuctionsService,
    private dialogLocalsService: DialogService,
    public accountService: AccountService) { }
  ngOnDestroy(): void {
    this.subscriberBids.unsubscribe();
  }
  ngAfterViewInit() {

  }
  showAuction(_id: string): void {
    this.router.navigateByUrl('/auctions/' + _id);
  }

  public goToRules(): void {
    this.router.navigateByUrl('/rules');
  }
  public sendEmail(): void {
    alert('function not available right now');
  }
  ngOnInit() {

    this.auctionService.getLastAuction().subscribe(auctionsResult => {
        const Last = auctionsResult[0];
        Last.imageFileName = environment.BaseUrl + 'uploads/' + Last.imageFileName;
        this.auction = Last;
      });
      this.subscriberBids = this.BidsService.subjectBidList.subscribe(bids => {
        this.numberOfBids = bids.length;
        this.numberOfproposal = Math.floor(bids.length * 0.9);
      });

  }

  public login(): void {
    const dialog = new DialogData("Login");
    dialog.title = 'User Login';
    dialog.text = '';
    this.dialogLocalsService.subjectType.next(dialog);
  }

}




