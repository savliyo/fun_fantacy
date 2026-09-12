import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { CreateOfferComponent } from './modify-offer/create-offer.component';
import { UpdateOfferComponent } from './modify-offer/update-offer.component';

const routes: Routes = [
{
  path: 'list',
  component: OfferListComponent
},
{
  path:'create',
  component: CreateOfferComponent
},
{
  path: 'update/:id',
  component: UpdateOfferComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
