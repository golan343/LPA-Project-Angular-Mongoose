import { TokenInterceptor } from './token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule, NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS, RecaptchaFormsModule } from 'ng-recaptcha';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';





import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuctionComponent } from './components/auction/auction.component';
import { InsertComponent } from './components/insert/insert.component';
import { HowItsWorkComponent } from './components/how-its-work/how-its-work.component';
import { LiveAuctionsComponent } from './components/live-auctions/live-auctions.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ClosedComponent } from './components/closed/closed.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LocationsComponent } from './components/locations/locations.component';
import { RulesComponent } from './components/rules/rules.component';


const globalSettings: RecaptchaSettings = { siteKey: '6LeFTeoZAAAAAOm4L0qfozbCzOYa3kzs_3zeCgUY'}


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    AuctionComponent,
    InsertComponent,
    HowItsWorkComponent,
    LiveAuctionsComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ClosedComponent,
    UpdateStatusComponent,
    ConfirmDialogComponent,
    SelectLanguageComponent,
    AboutUsComponent,
    ContactUsComponent,
    LocationsComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatDialogModule,
    FlexLayoutModule,
    DragDropModule,
    MatProgressBarModule,
    MatGridListModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2wURHwwXpa8qENVlEumlR87zxya7Xy00'
    }),
    I18nModule,
    NgxFlagIconCssModule
  ],
  providers: [ CookieService ,
    // { provide: RECAPTCHA_SETTINGS, useValue: globalSettings },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
