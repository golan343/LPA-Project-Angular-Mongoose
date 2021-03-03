import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { MobileService } from './../../../services/mobile.service';
import { DialogData } from './../../../ui/model/dialog-data';
import { DialogService } from './../../../ui/dialog.service';
import { Subscription } from 'rxjs';
import { UserModel } from './../../../models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMobile: boolean;
  isLogin: boolean;
  subscriberLogin: Subscription;
  subscriberUserIcon: Subscription;
  user: UserModel;
  userImage:string;
  constructor(private router: Router,
    public accountService: AccountService,
    private dialogLocalsService: DialogService,
    private mobile: MobileService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnDestroy(): void {
    this.subscriberLogin.unsubscribe();
    this.subscriberUserIcon.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriberLogin = this.accountService.isLoginSubject.subscribe(isLogin => {
      this.isLogin = isLogin
      const cookieUsr = sessionStorage.getItem('user');
    if (cookieUsr && isLogin && !this.userImage) {
      const cookieUsrParsed = JSON.parse(cookieUsr);
      this.user = cookieUsrParsed as UserModel;
      
    }
    this.accountService.currentUserIconSubject.subscribe(base64StringImg=>{
      if(base64StringImg){
        this.cdr.detectChanges();
        this.userImage = base64StringImg;
      }
    },
    err=>{ console.log(err);});
    });
    
  }
  menuToggle() {
    this.showMobile = !this.showMobile;
    this.mobile.showMenuTrigger.next(this.showMobile);
  }
  public moveToHome(): void {
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.accountService.logout();
  }

  login(): void {
    const dialog = new DialogData("Login");
    dialog.title = '';
    dialog.text = '';
    this.dialogLocalsService.subjectType.next(dialog);
  }
  placeBid() {
    this.router.navigate(["live"]);
  }
}
