import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './match-list/match-list.component';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { CreateMatchComponent } from './modify-match/create-match.component';
import { MatchFormComponent } from './modify-match/match-form/match-form.component';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxSelectComponent } from '../../shared/ui/form/mx-select';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxImageComponent } from '../../shared/ui/display-image';
import { UpdateMatchComponent } from './modify-match/update-match.component';
import { MxEditorComponent } from '../../shared/ui/form/editor';
import { MxBadgeComponent } from '../../shared/ui/badge';
import { MxBreadcrumbsComponent } from '../../shared/ui/breadcrumbs';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxButtonComponent } from '../../shared/ui/button';

@NgModule({
  declarations: [
    MatchListComponent,
    CreateMatchComponent,
    MatchFormComponent,
    UpdateMatchComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    MxGridShellComponent,
    MxGridToolbarComponent,
    GridColumnsComponent,
    MxGridFilterComponent,
    MxActionComponent,
    PageHeaderComponent,
    MxFormComponent,
    MxInputComponent,
    MxSelectComponent,
    MxFileUploadComponent,
    MxTextareaComponent,
    MxImageComponent,
    MxEditorComponent,
    MxBadgeComponent,
    MxBreadcrumbsComponent,
    MxIconComponent,
    MxButtonComponent,
  ],
})
export class MatchModule {}
