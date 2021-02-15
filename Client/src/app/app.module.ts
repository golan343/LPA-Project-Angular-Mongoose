import { TokenInterceptor } from './token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {
//   BrowserAnimationsModule,
//   NoopAnimationsModule,
// } from '@angular/platform-browser/animations';

// import { AgmCoreModule } from '@agm/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { CookieService } from 'ngx-cookie-service';

// import {
//   RecaptchaModule,
//   RecaptchaSettings,
//   RECAPTCHA_SETTINGS,
//   RecaptchaFormsModule,
// } from 'ng-recaptcha';
// import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
// import { DialogModule } from './ui/dialog.module';

import { HttpLoadingInterceptor } from './interceptors/http-loading.interceptor';


// import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { ShowPasswordDirective } from './directives/show-password.directive';
import { OnlyNumericDirective } from './directives/only-numeric.directive';
//import { UtilsModule } from './utils/utils.module';
import { MainComponent } from './main/main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { NumberPipe } from './pipes/number.pipe';
import { ResetComponent } from './site-layout/components/reset/reset.component';

// const globalSettings: RecaptchaSettings = {
//   siteKey: '6LeFTeoZAAAAAOm4L0qfozbCzOYa3kzs_3zeCgUY',
// };

@NgModule({
  declarations: [
    OnlyNumericDirective,
    SelectLanguageComponent,
    ShowPasswordDirective,
    MainComponent,
    NumberPipe,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DashboardModule,
    SiteLayoutModule,
    FormsModule
  ],
  providers: [
    CookieService,
    // { provide: RECAPTCHA_SETTINGS, useValue: globalSettings },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  entryComponents: [],
  bootstrap: [MainComponent],
})
export class AppModule { }
