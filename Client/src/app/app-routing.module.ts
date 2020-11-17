import { AccountGuard } from './guards/account.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionComponent } from './components/auction/auction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { InsertComponent } from './components/insert/insert.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'how-its-work', component: HowItsWorkComponent },
  { path: 'auctions/:_id', component: AuctionComponent },
  { path: 'add-auction', component: InsertComponent, canActivate: [AccountGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AccountGuard] },
  { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'live', component: LiveAuctionsComponent, canActivate: [AccountGuard]  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // pathMath - exact empty string.
  { path: '**', component: PageNotFoundComponent } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
