import { Component, HostListener, OnDestroy, OnInit, VERSION } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'ngx-cookie-service';
import { fadeAnimation } from './../../models/animation'
import { MobileService } from 'src/app/services/mobile.service';
import { Subscription } from 'rxjs';
import { BidsService } from 'src/app/services/bids.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [fadeAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscribeMenu: Subscription;
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
  }
  ngOnInit(): void {
    this.accountService.isUserLoggedIn();
    this.bidsService.getAllBids();
    this.subscribeMenu = this.mobile.showMenuTrigger.subscribe(show => {
      this.showMenu = show;
    });
    this.menuColor = { black: true };
  }
  @HostListener('window:scroll', ['$event']) private onScroll($event: Event): void {
    if (window.scrollY > window.innerHeight / 10) {
      this.menuColor = { black: true };
    }
    if (window.scrollY > 3 * window.innerHeight / 10) {
      this.menuColor = { dark: true };
    }
    if (window.scrollY - 100 > window.innerHeight) {
      this.menuColor = { white: true };
    }
  };
  public goToDashboard(): void {
    let route = '/dashboard/user-panel';
    if (this.accountService.isAdmin()) {
      const role = JSON.parse(this.cookieService.get('user')).user.roleId;
      if (role === '5f58ba8855eac12930d7b405') {
        route = '/dashboard/admin-panel';
        alert('admin');

      }
      else if (role === '5f58ba9a55eac12930d7b40c') {
        route = '/dashboard/sub-admin-panel';
        alert('sub admin');

      }
      else if (role === '5f58badd55eac12930d7b427') {
        route = '/dashboard/admin-panel';
        alert('gish admin');

      }
    }
    this.router.navigateByUrl(route);
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
