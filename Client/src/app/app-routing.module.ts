import { LocationsComponent } from './components/locations/locations.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminGuard } from './guards/admin.guard';
import { AccountGuard } from './guards/account.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionComponent } from './components/auction/auction.component';
import { HomeComponent } from './components/home/home.component';
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { InsertComponent } from './components/insert/insert.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ClosedComponent } from './components/closed/closed.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'how-its-work', component: HowItsWorkComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'auctions/:_id', component: AuctionComponent },
  { path: 'add-auction', component: InsertComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(d => d.DashboardModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'live', component: LiveAuctionsComponent, canActivate: [AccountGuard]  },
  { path: 'closed', component: ClosedComponent, canActivate: [AccountGuard]  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // pathMath - exact empty string.
  { path: '**', component: PageNotFoundComponent } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
