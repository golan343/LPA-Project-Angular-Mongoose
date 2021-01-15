import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminGuard } from '../guards/admin.guard';
import { AccountGuard } from '../guards/account.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionComponent } from './components/auction/auction.component';
import { HomeComponent } from './components/home/home.component';
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { RegisterComponent } from './components/register/register.component';
import { ClosedComponent } from './components/closed/closed.component';
import { ClosedAuctionComponent } from './components/closed-auction/closed-auction.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-its-work', component: HowItsWorkComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'auction/:id', component: AuctionComponent },
  { path: 'closed-auction/:id', component: ClosedAuctionComponent },
  //{ path: 'dashboard', loadChildren: () => import('./../dashboard/dashboard.module').then(d => d.DashboardModule), canActivate: [AdminGuard] },
  { path: 'live', component: LiveAuctionsComponent },
  { path: 'closed', component: ClosedComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // pathMath - exact empty string.
  { path: '**', component: PageNotFoundComponent } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
