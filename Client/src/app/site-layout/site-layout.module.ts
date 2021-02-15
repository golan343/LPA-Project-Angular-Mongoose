import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuctionComponent } from './components/auction/auction.component';
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { HeaderComponent } from './components/header/header.component';
import { ClosedComponent } from './components/closed/closed.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuctionItemComponent } from './components/auction-item/auction-item.component';
import { GlobalLoaderComponent } from './components/loader/global-loader/global-loader.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { DialogModule } from '../ui/dialog.module';
import { UtilsModule } from '../utils/utils.module';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { LoaderComponent } from './components/loader/loader.component'
import { ClosedAuctionComponent } from './components/closed-auction/closed-auction.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { PageComponent } from './components/page/page.component';




@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    AuctionComponent,
    HowItsWorkComponent,
    LiveAuctionsComponent,
    HeaderComponent,
    ClosedComponent,
    AboutUsComponent,
    ContactUsComponent,
    AuctionItemComponent,
    ClosedAuctionComponent,
    GlobalLoaderComponent,
    LoaderComponent,
    MainlayoutComponent,
    PageComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    //NoopAnimationsModule,
    // FlexLayoutModule,
    // DragDropModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    //FlexLayoutModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2wURHwwXpa8qENVlEumlR87zxya7Xy00',
    }),
    NgxFlagIconCssModule,
    DialogModule,
    UtilsModule,
  ],
  exports: [MainlayoutComponent, GlobalLoaderComponent]
})

export class SiteLayoutModule { }
