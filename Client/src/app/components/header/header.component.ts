import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public accountService: AccountService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
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
