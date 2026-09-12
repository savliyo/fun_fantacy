import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { R_userLogin } from '../../../../../../../libs/mx-schema/src';
import { APP_CONFIG } from '../../../../config';
import { ApiService } from '../../../shared/services/api.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { Dialog } from '@angular/cdk/dialog';
import { TandCDialogComponent } from '../components/tandc.component';
import { PrivacyPolicyDialogComponent } from '../components/privacy-policy.component';
import { RefundDialogComponent } from '../components/refund-policy.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private ls: LocalStorageService,
    private dialog: Dialog
  ) {}

  showErrors = false;
  PANEL_CONFIG = APP_CONFIG.panelConfig;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  private sidebarService = inject(SidebarService);

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.api.post<R_userLogin>('/user/login', this.loginForm.value).subscribe({
      next: (data) => {
        this.ls.set('token', data.data.token);
        this.sidebarService.setMenu(data.data.menu);
        this.router.navigate(['/']);
      },
    });
  }

  openTandc() {
    this.dialog.open(TandCDialogComponent);
  }

  openpp() {
    this.dialog.open(PrivacyPolicyDialogComponent);
  }

  openrp() {
    this.dialog.open(RefundDialogComponent);
  }
}
