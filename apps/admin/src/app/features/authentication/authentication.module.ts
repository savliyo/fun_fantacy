import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { MxDialogModule } from '../../shared/ui/dialog/dialog.module';
import { TandCDialogComponent } from './components/tandc.component';
import { RefundDialogComponent } from './components/refund-policy.component';
import { PrivacyPolicyDialogComponent } from './components/privacy-policy.component';

@NgModule({
  declarations: [
    LoginComponent,
    TandCDialogComponent,
    RefundDialogComponent,
    PrivacyPolicyDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MxButtonComponent,
    MxInputComponent,
    MxIconComponent,
    MxCardModule,
    MxDialogModule,
  ],
})
export class AuthenticationModule {}
