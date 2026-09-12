import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-user',
  template: `<page-header header="Add User">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <user-form />`,
})
export class CreateUserComponent implements AfterViewInit, OnDestroy {
  @ViewChild(UserFormComponent) UserFormComponent!: UserFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  userForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.userForm = this.UserFormComponent.userForm;
  }

  handleSubmit() {
    if (this.userForm.invalid) {
      this.UserFormComponent.showErrors = true;
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding User',
      id: 'add-user',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/user/create', this.userForm.value)
      .subscribe({
        next: () => {
          this.userForm.reset();
          this.notif.updateToast({
            text: 'User added',
            id: 'add-user',
            type: 'success',
          });
        },
      });
  }
}
