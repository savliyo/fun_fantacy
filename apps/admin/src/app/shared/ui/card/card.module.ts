import { NgModule } from '@angular/core';
import {
  MxCardContentDirective,
  MxCardDirective,
  MxCardFooterDirective,
  MxCardHeaderDirective,
  MxCardTitleDirective,
} from './card.directive';

@NgModule({
  declarations: [
    MxCardContentDirective,
    MxCardDirective,
    MxCardHeaderDirective,
    MxCardFooterDirective,
    MxCardTitleDirective,
  ],
  exports: [
    MxCardContentDirective,
    MxCardDirective,
    MxCardHeaderDirective,
    MxCardFooterDirective,
    MxCardTitleDirective,
  ],
})
export class MxCardModule {}
