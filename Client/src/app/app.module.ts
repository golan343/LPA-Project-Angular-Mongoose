import { TokenInterceptor } from './token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import {
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
} from 'ng-recaptcha';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { DialogModule } from './ui/dialog.module';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuctionComponent } from './components/auction/auction.component';
;
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpLoadingInterceptor } from './interceptors/http-loading.interceptor';
import { ClosedComponent } from './components/closed/closed.component';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ShowPasswordDirective } from './directives/show-password.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { AuctionItemComponent } from './components/auction-item/auction-item.component';
import { ClosedAuctionComponent } from './components/closed-auction/closed-auction.component';
import { GlobalLoaderComponent } from './components/loader/global-loader/global-loader.component';
import { OnlyNumericDirective } from './directives/only-numeric.directive';

const globalSettings: RecaptchaSettings = {
  siteKey: '6LeFTeoZAAAAAOm4L0qfozbCzOYa3kzs_3zeCgUY',
};

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    AuctionComponent,
    HowItsWorkComponent,
    LiveAuctionsComponent,
    HeaderComponent,
    ClosedComponent,

    ConfirmDialogComponent,
    SelectLanguageComponent,
    AboutUsComponent,
    ContactUsComponent,
    ShowPasswordDirective,
    LoaderComponent,
    AuctionItemComponent,
    ClosedAuctionComponent,
    GlobalLoaderComponent,
    OnlyNumericDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2wURHwwXpa8qENVlEumlR87zxya7Xy00',
    }),
    I18nModule,
    NgxFlagIconCssModule,
    DialogModule,
  ],
  providers: [
    CookieService,
    // { provide: RECAPTCHA_SETTINGS, useValue: globalSettings },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
