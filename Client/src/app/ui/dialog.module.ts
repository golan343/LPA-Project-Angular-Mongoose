import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { VideoFrameComponent } from './video-frame/video-frame.component';
import { SafePipe } from './../pipes/safe.pipe';
import { CarIconComponent } from './icons/car-icon/car-icon.component';


@NgModule({
  declarations: [DialogComponent, LoginComponent, RegisterComponent, VideoFrameComponent, SafePipe, CarIconComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
