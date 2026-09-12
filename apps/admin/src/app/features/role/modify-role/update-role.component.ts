import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { RoleFormComponent } from './role-form/role-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TRole } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-role',
  template: ` <page-header header="Edit Role">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <role-form />`,
})
export class UpdateRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RoleFormComponent) roleFormComponent!: RoleFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  roleID!: string;
  roleForm!: FormGroup;
  private requests = new SubSink();

  ngOnInit(): void {
    this.roleID = this.route.snapshot.params['id'];
    this.fetchRoleDetails(this.roleID);
  }

  ngAfterViewInit(): void {
    this.roleForm = this.roleFormComponent.roleForm;
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchRoleDetails(id: string) {
    this.api.get<TRole>(`/role/${id}`).subscribe(({ data }) => {
      this.roleForm.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.roleForm.invalid) {
      this.roleFormComponent.showErrors = true;
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Role',
      id: 'update-role',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/role/${this.roleID}`, this.roleForm.value)
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Role updated',
            id: 'update-role',
            type: 'success',
          });
          this.router.navigate(['/role/list']);
        },
      });
  }
}
