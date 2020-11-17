import { AccountGuard } from './../../guards/account.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { MyAccountComponent } from './my-account/my-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'my-account', component: MyAccountComponent }
  ] }
];

@NgModule({
  declarations: [ MyAccountComponent, DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }

