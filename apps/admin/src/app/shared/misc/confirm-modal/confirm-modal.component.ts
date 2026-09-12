import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MxButtonComponent } from '../../ui/button';
import { MxDialogModule } from '../../ui/dialog/dialog.module';

@Component({
  selector: 'confirm-modal',
  standalone: true,
  imports: [MxDialogModule, MxButtonComponent],
  template: `<mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>{{ data.title }}</mx-dialog-title>
      <mx-dialog-description>{{ data.description }}</mx-dialog-description>
    </mx-dialog-header>
    <mx-dialog-footer>
      <mx-button
        variant="destructive"
        (handleClick)="dialogRef.close({ success: true })"
        >OK</mx-button
      >
      <mx-button (handleClick)="dialogRef.close({ success: false })"
        >CANCEL</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: DialogRef<{ success: boolean }>,
    @Inject(DIALOG_DATA) public data: { title: string; description?: string }
  ) {}
}
