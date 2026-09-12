import { NgModule } from "@angular/core";
import { DialogModule } from "@angular/cdk/dialog";
import {
  MxDialogContainerComponent,
  MxDialogContentComponent,
  MxDialogDescriptionComponent,
  MxDialogFooterComponent,
  MxDialogHeaderComponent,
  MxDialogTitleComponent,
} from "./dialog.component";

@NgModule({
  declarations: [
    MxDialogContainerComponent,
    MxDialogDescriptionComponent,
    MxDialogFooterComponent,
    MxDialogHeaderComponent,
    MxDialogTitleComponent,
    MxDialogContentComponent,
  ],
  imports: [DialogModule],
  exports: [
    MxDialogContainerComponent,
    MxDialogDescriptionComponent,
    MxDialogFooterComponent,
    MxDialogHeaderComponent,
    MxDialogTitleComponent,
    MxDialogContentComponent,
  ],
})
export class MxDialogModule {}
