import { BaseUrl } from './../../../environments/environment';
import { Unsubscribe } from 'redux';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { store } from 'src/app/redux/store';
import { AuctionsService } from 'src/app/services/auctions.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  public auctions: AuctionModel[];
  public unsubscribe: Unsubscribe;
  public BaseUrl = BaseUrl;
  lat = -0.180653;
  lng = -78.467834;

  constructor(
    private router: Router,
    private auctionService: AuctionsService,
    public dialog: MatDialog,
    public accountService: AccountService) { }
  ngOnDestroy(): void {
  }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  public showAuction(_id: string): void {
    this.router.navigateByUrl('/auctions/' + _id);

  }

  public goToRules(): void {
    this.router.navigateByUrl('/rules');
  }
  public sendEmail(): void {
    alert('function not available right now');
  }
  // tslint:disable-next-line: typedef
  async ngOnInit() {
    try{
      this.unsubscribe = store.subscribe(() => this.auctions = store.getState().auctions);
      if (store.getState().auctions.length === 0 || store.getState().auctions.length > 1 ) {
        await this.auctionService.getLastAuction();
      }
      else {
        this.auctions = store.getState().auctions;
      }

    }
    catch(err){
      alert(err.message);
    }
    

  }

  public loginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'custom-dialog-container',
      width: '450px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}




