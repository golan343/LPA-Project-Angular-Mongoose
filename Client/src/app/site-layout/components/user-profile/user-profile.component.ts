import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AuctionsService } from './../../../services/auctions.service';
import { AccountService } from './../../../services/account.service';
import { map } from 'rxjs/operators';
import { AuctionModel } from 'src/app/models/auction-model';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  UserAuctions: any;
  winningAuctions: AuctionModel[];
  title = 'User Profile';
  userImage = '';
  smaNotify = true;
  emailNotify = false;
  paging: Pagination;
  constructor(private auctionService: AuctionsService,
    public account: AccountService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {

    this.auctionService.getUserAuction(this.account.user._id).pipe(map(data => {
      const AuctionsList = Object.keys(data).map(item => data[item]);
      this.winningAuctions = AuctionsList.filter(item => item.isWinner)
      return AuctionsList;
    })).subscribe(result => {
      this.UserAuctions = result;
      this.paging = new Pagination(6, result.length);
      this.cdr.detectChanges();
    });
    this.account.currentUserIconSubject.subscribe(base64StringImg => {
      if (base64StringImg) {
        this.userImage = base64StringImg;
        this.cdr.detectChanges();
      }
    },
      err => { console.log(err); });

  }

}
