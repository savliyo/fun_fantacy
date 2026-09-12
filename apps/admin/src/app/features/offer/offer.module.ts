import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxIconComponent } from '../../shared/ui/icon';

import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferFormComponent } from './modify-offer/offer-form/offer-form.component';
import { CreateOfferComponent } from './modify-offer/create-offer.component';
import { UpdateOfferComponent } from './modify-offer/update-offer.component';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { OfferRoutingModule } from './offer-routing.module';
import { MxSelectComponent } from '../../shared/ui/form/mx-select';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferFormComponent,
    CreateOfferComponent,
    UpdateOfferComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxInputComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
    OfferRoutingModule,
    MxSelectComponent,
  ],
})
export class OfferModule {}
