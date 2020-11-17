import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {DashboardComponent} from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  { path: 'my-account', component: MyAccountComponent }
];

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
