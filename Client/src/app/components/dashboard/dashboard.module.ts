import { AccountGuard } from './../../guards/account.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path: 'my-account', component: MyAccountComponent, canActivate: [AccountGuard] }
];

@NgModule({
  declarations: [ MyAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }

