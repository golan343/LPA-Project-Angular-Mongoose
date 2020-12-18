import { Component, HostListener, OnDestroy, OnInit, VERSION } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { fadeAnimation } from './../../models/animation'
import { MobileService } from 'src/app/services/mobile.service';
import { Subscription } from 'rxjs';

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
    public dialog: MatDialog,
    private cookieService: CookieService,
    private mobile: MobileService) { }
  ngOnDestroy(): void {
    this.subscribeMenu.unsubscribe();
  }
  ngOnInit(): void {
    this.subscribeMenu = this.mobile.showMenuTrigger.subscribe(show => {
      this.showMenu = show;
    });
    this.menuColor = { black: true };
  }
  @HostListener('window:scroll', ['$event']) private onScroll($event: Event): void {
    console.log(window.scrollY);
    if (window.scrollY > window.innerHeight / 10) {
      this.menuColor = { black: true };
    }
    if (window.scrollY > 3 * window.innerHeight / 10) {
      this.menuColor = { dark: true };
    }
    if (window.scrollY > 6 * window.innerHeight / 10) {
      this.menuColor = { gray: true };
    }
    if (window.scrollY > window.innerHeight) {
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

  public login(): void {

    // const dialogRef = this.dialog.open(LoginComponent, {
    //   panelClass: 'custom-dialog-container',
    //   width: '450px',
    //   height: '300px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }

  public moveToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
