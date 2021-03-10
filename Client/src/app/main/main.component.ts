import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isAdmin: boolean;
  isOnline:boolean;
  constructor(private auth: AccountService) {
  }
  ngOnInit(): void {
    this.isOnline = window.navigator.onLine;
    if(this.isOnline){
      this.auth.isUserLoggedIn();
      this.auth.isLoginSubject.subscribe(res => {
        this.isAdmin = this.auth.user ? this.auth.user.isAdmin : false;
      })
    }
    
    

  }

}
