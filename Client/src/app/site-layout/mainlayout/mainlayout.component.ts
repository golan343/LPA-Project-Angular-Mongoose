import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './../../services/account.service';
import { BidsService } from './../../services/bids.service';
import { MobileService } from './../../services/mobile.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {
  subscribeMenu: Subscription;
  colorScriber: Subscription;
  showMenu: boolean;
  menuColor: any;
  public constructor(
    private router: Router,
    public accountService: AccountService,
    private mobile: MobileService,
    private bidsService: BidsService
  ) { }
  ngOnDestroy(): void {
    if (this.subscribeMenu)
        this.subscribeMenu.unsubscribe();
    if (this.colorScriber)
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


  public moveToHome(): void {
    this.router.navigateByUrl('/');
  }

}
