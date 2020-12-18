import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DialogComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
