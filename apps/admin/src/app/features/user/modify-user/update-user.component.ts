import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TUser } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-user',
  template: ` <page-header header="Edit User">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <user-form />`,
})
export class UpdateUserComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userID!: string;
  userForm!: FormGroup;
  private requests = new SubSink();

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
    this.fetchUserDetails(this.userID);
  }

  ngAfterViewInit(): void {
    this.userForm = this.userFormComponent.userForm;
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchUserDetails(id: string) {
    this.api.get<TUser>(`/user/${id}`).subscribe(({ data }) => {
      this.userForm.patchValue({ email: data.email });
    });
  }

  handleSubmit() {
    if (this.userForm.invalid) {
      this.userFormComponent.showErrors = true;
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating User',
      id: 'update-user',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/user/${this.userID}`, this.userForm.value)
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'User updated',
            id: 'update-user',
            type: 'success',
          });
          this.router.navigate(['/user/list']);
        },
      });
  }
}
