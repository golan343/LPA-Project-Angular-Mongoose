import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { CookieService } from 'ngx-cookie-service';
import { fadeAnimation } from './../../../models/animation'
import { MobileService } from './../../../services/mobile.service';
import { Subscription } from 'rxjs';
import { BidsService } from './../../../services/bids.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [fadeAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscribeMenu: Subscription;
  colorScriber: Subscription;
  showMenu: boolean;
  menuColor: any;
  public constructor(private bpo: BreakpointObserver,
    private router: Router,
    public accountService: AccountService,
    private cookieService: CookieService,
    private mobile: MobileService,
    private bidsService: BidsService
  ) { }
  ngOnDestroy(): void {
    this.subscribeMenu.unsubscribe();
    this.colorScriber.unsubscribe();
  }
  ngOnInit(): void {
    this.bidsService.getAllBids();
    this.subscribeMenu = this.mobile.showMenuTrigger.subscribe(show => {
      this.showMenu = show;
    });
    this.subscribeMenu = this.mobile.cahngeMenuColor.subscribe(color => {
      this.menuColor = color;
    });
    this.menuColor = { black: true };
  }

  public logout(): void {
    this.accountService.logout();
  }


  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }

  public moveToHome(): void {
    this.router.navigateByUrl('/');
  }
}
