import { AccountGuard } from '../guards/account.guard';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { AdminComponent } from './admin/admin.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { CMSComponent } from './cms/cms.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentTransactionsHistoryComponent } from './payment-transactions-history/payment-transactions-history.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { DialogModule } from '../ui/dialog.module';
import { AdminLoaderComponent } from './admin-loader/admin-loader.component';
// const routes: Routes = [
//   { path: '', component: AdminComponent },
//   { path: 'my-account', component: MyAccountComponent },
//       { path: 'global-settings', component: GlobalSettingsComponent },
//       { path: 'cms', component: CMSComponent },
//       { path: 'auctions', component: AuctionsComponent },
//       { path: 'notifications', component: NotificationsComponent },
//       { path: 'payment-transactions-history', component: PaymentTransactionsHistoryComponent },
//       { path: 'user-manager', component: UserManagerComponent },

//   , {
//     path: 'sub-admin-panel', component: SubAdminComponent, children: [
//       // here like the admin routes;
//     ]
//   }, {
//     path: 'user-panel', component: UserPanelComponent, children: [
//       // here like the admin routes;
//     ]
//   }
// ];

@NgModule({
  declarations: [MyAccountComponent,
    AdminComponent,
    GlobalSettingsComponent,
    CMSComponent,
    AuctionsComponent,
    NotificationsComponent,
    PaymentTransactionsHistoryComponent,
    UserManagerComponent,
    SubAdminComponent,
    UserPanelComponent,
    MainDashboardComponent,
    AdminLoaderComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    // RouterModule.forChild(routes)
    DialogModule
  ],
  exports: [MainDashboardComponent]
})
export class DashboardModule { }

