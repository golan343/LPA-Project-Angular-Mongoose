import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              public accountService: AccountService,
              public dialog: MatDialog,
              private cookieService: CookieService ) { }

  ngOnInit(): void {
  }

  public goToDashboard(): void {
    let route = '/user-panel';
    if (this.accountService.isAdmin()){
      const role = JSON.parse(this.cookieService.get('user')).user.roleId;
      if (role === '5f58ba8855eac12930d7b405'){
        route = '/admin-panel';
        alert('admin');

      }
      else if (role === '5f58ba9a55eac12930d7b40c'){
        route = '/sub-admin';
        alert('sub admin');

      }
      else if (role === '5f58badd55eac12930d7b427'){
        route = '/gish-admin';
        alert('gish admin');

      }
    }
    this.router.navigateByUrl(route);
  }

  public logout(): void{
    this.accountService.logout();
  }

  public login(): void {
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
