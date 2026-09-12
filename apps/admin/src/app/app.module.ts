import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/helpers/sidebar/sidebar.component';
import { HeaderComponent } from './layout/helpers/header/header.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { GbNotificationModule } from './shared/ui/notification/notification.module';
import { TokenInterceptor } from './shared/services/token-interceptor.service';
import { MxDropdownModule } from './shared/ui/dropdown/dropdown.module';
import { MxIconComponent } from './shared/ui/icon';
import { MxButtonComponent } from './shared/ui/button';
import { MxInputComponent } from './shared/ui/form/mx-input';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CdkTreeModule,
    MxButtonComponent,
    MxIconComponent,
    MxDropdownModule,
    MxInputComponent,
    GbNotificationModule.forRoot(),
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
