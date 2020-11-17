import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {DashboardComponent} from '../dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, loadChildren: () => import('./components/dashboard/dashboard/dashboard.module').then(d => d.DashboardModule)
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
