import { AccountGuard } from '../guards/account.guard';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule } from '@angular/forms';


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
    AdminLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([]),
    // RouterModule.forChild(routes)
    DialogModule
  ],
  exports: [MainDashboardComponent]
})
export class DashboardModule { }

