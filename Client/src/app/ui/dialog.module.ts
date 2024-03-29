import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { VideoFrameComponent } from './video-frame/video-frame.component';
import { SafePipe } from './../pipes/safe.pipe';
import { CarIconComponent } from './icons/car-icon/car-icon.component';
import { UtilsModule } from './../utils/utils.module';
import { DialogService } from './dialog.service';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { FlagSelectComponent } from './flag-select/flag-select.component';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ErrorBubbleComponent } from './error-bubble/error-bubble.component';
import { ProfileImageSettingComponent } from './profile-image-setting/profile-image-setting.component';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';
import { SaleComponent } from './sale/sale.component';

@NgModule({
  declarations: [
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    VideoFrameComponent,
    SafePipe,
    CarIconComponent,
    ForgotPassComponent,
    CheckBoxComponent,
    FlagSelectComponent,
    SwitchButtonComponent,
    CalendarComponent,
    ErrorBubbleComponent,
    ProfileImageSettingComponent,
    ImageCanvasComponent,
    SaleComponent,
  ],
  imports: [CommonModule, FormsModule, UtilsModule],
  exports: [DialogComponent,
     CheckBoxComponent,
     FlagSelectComponent,
     SwitchButtonComponent,
     CalendarComponent, 
     ErrorBubbleComponent,
     ProfileImageSettingComponent,ImageCanvasComponent],
  providers: [DialogService],
})
export class DialogModule {}
