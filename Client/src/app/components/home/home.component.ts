import { BaseUrl, environment } from './../../../environments/environment';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { AuctionsService } from 'src/app/services/auctions.service';
import { AccountService } from 'src/app/services/account.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from '../../ui/dialog.service';
import { MobileService } from '../../services/mobile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  auction$: Observable<AuctionModel[]>;
  public auction: AuctionModel;
  public BaseUrl = BaseUrl;
  lat = -3.180653;
  lng = -72.467834;



  constructor(
    private router: Router,
    private UtilService: MobileService,
    private auctionService: AuctionsService,
    private dialogLocalsService: DialogService,
    public accountService: AccountService) { }
  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.onScroll);
  }
  ngAfterViewInit() { }
  @HostListener('window:scroll', ['$event']) private onScroll($event: Event): void {
    let menuColor = {};
    if (window.scrollY > window.innerHeight / 10) {
      menuColor = { black: true };
    }
    if (window.scrollY > 3 * window.innerHeight / 10) {
      menuColor = { dark: true };
    }
    if (window.scrollY - 100 > window.innerHeight) {
      menuColor = { white: true };
    }
    this.UtilService.cahngeMenuColor.next(menuColor);
  };
  showAuction(_id: string): void {
    this.router.navigateByUrl('/auctions/' + _id);
  }

  public goToRules(): void {
    this.router.navigateByUrl('/rules');
  }
  ngOnInit() {
    this.auction$ = this.auctionService.getLastAuction();
    this.auction$.subscribe(auctionsResult => {

      const Last = auctionsResult[0];
      Last.imageFileName = environment.devUrl + 'uploads/' + Last.imageFileName;
      this.auction = Last;
    });
  }
  sendEmail() {

  }

  public login(): void {
    const dialog = new DialogData("Login");
    dialog.title = 'User Login';
    dialog.text = '';
    this.dialogLocalsService.subjectType.next(dialog);
  }

}