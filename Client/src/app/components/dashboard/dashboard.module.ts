import { AccountGuard } from './../../guards/account.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { CMSComponent } from './cms/cms.component';
import { RolesComponent } from './roles/roles.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentTransactionsHistoryComponent } from './payment-transactions-history/payment-transactions-history.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'my-account', component: MyAccountComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'global-settings', component: GlobalSettingsComponent },
      { path: 'cms', component: CMSComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'auctions', component: AuctionsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'payment-transactions-history', component: PaymentTransactionsHistoryComponent },
      { path: 'user-manager', component: UserManagerComponent },
    ]
  }
];

@NgModule({
  declarations: [MyAccountComponent,
    DashboardComponent,
    AdminComponent,
    GlobalSettingsComponent,
    CMSComponent,
    RolesComponent,
    AuctionsComponent,
    NotificationsComponent,
    PaymentTransactionsHistoryComponent,
    UserManagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }

