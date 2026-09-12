import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { FilterData } from '../../../../../../../libs/mx-schema/src';
import { GbFilterPanelComponent } from './filters.component';
import { FilterType } from './types';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  overlay = inject(Overlay);

  private filters = new BehaviorSubject<FilterType | []>([]);
  private filterData = new BehaviorSubject<FilterData[]>([]);

  filters$ = this.filters.asObservable().pipe(shareReplay());
  filterData$ = this.filterData.asObservable();

  updateFilters(filters: FilterType) {
    this.filters.next(filters);
  }

  updateFilterData(filterData: FilterData[]) {
    this.filterData.next(filterData);
  }

  openFilterPanel() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right().top(),
      hasBackdrop: true,
    });

    const injector = this.getFilterInjector(overlayRef);
    const filterPanel = new ComponentPortal(
      GbFilterPanelComponent,
      null,
      injector
    );
    return overlayRef.attach(filterPanel);
  }

  clearFilterData() {
    this.filterData.next([]);
  }

  removeSingleFilter(field: string) {
    const filters = this.filterData.getValue();
    const index = filters.findIndex((i) => i.field === field);
    filters.splice(index, 1);

    this.filterData.next(filters);
  }

  private getFilterInjector(ref: OverlayRef) {
    const tokens = new WeakMap();
    tokens.set(OverlayRef, ref);
    return Injector.create({
      providers: [{ provide: OverlayRef, useValue: ref }],
    });
  }
}
