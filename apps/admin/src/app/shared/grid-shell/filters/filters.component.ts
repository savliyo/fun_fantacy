import { OverlayRef } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MxButtonComponent } from '../../ui/button';
import { MxSelectComponent } from '../../ui/form/mx-select';
import { MxInputComponent } from '../../ui/form/mx-input';
import { FilterService } from './filter.service';
import { FilterType } from './types';
import { SubSink } from '../../utils/sub-sink';
import { FilterData } from '../../../../../../../libs/mx-schema/src';

@Component({
  standalone: true,
  selector: 'gb-grid-filters',
  imports: [
    MxInputComponent,
    MxSelectComponent,
    NgTemplateOutlet,
    MxButtonComponent,
  ],
  templateUrl: './filters.component.html',
})
export class GbFilterPanelComponent implements OnInit, OnDestroy {
  private overlayRef = inject(OverlayRef);
  private filterService = inject(FilterService);
  private fb = inject(FormBuilder);

  private subs = new SubSink();

  filters!: FilterType;
  filterForm!: FormGroup;
  conditionForm!: FormGroup;
  searchTypeText = new FormControl('equals');
  searchTypeNumber = new FormControl('equals');

  readonly conditions = {
    text: ['equals', 'contains', 'not equal'],
    number: ['equals', 'greater than', 'less than', 'between'],
  };
  private readonly invalidValues = [null, 'undefined', NaN];

  get controls() {
    return this.filterForm?.controls;
  }

  get conditionControls() {
    return this.conditionForm?.controls;
  }

  ngOnInit(): void {
    this.subs.sink = this.overlayRef.backdropClick().subscribe({
      next: () => this.overlayRef.dispose(),
    });

    this.subs.sink = this.filterService.filters$.subscribe((filter) => {
      if (filter instanceof QueryList) {
        this.assignFilters(filter);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  close() {
    this.overlayRef.dispose();
  }

  handleSearch() {
    const filterValue = this.getFilterValue() as FilterData[];
    if (!filterValue.length) {
      return;
    }
    this.filterService.updateFilterData(filterValue);
    this.overlayRef.dispose();
  }

  clearFilters() {
    this.filterService.clearFilterData();
    this.overlayRef.dispose();
  }

  private assignFilters(filters: FilterType) {
    const rawFilters = filters.toArray();
    const form: Record<string, any[]> = {};
    const conditionForm: Record<string, any[]> = {};
    for (const filter of rawFilters) {
      form[filter.field] = [null];
      conditionForm[filter.field] = ['equals'];
    }
    this.filterForm = this.fb.group(form);
    this.conditionForm = this.fb.group(conditionForm);
    this.filters = filters;
    this.patchFilterData();
  }

  private getFilterValue() {
    const rawFilters = this.filters.toArray();
    return rawFilters
      .map((filter) => {
        let formValue = this.filterForm.value[filter.field];
        const conditionValue = this.conditionForm.value[filter.field];

        if (this.invalidValues.includes(formValue)) {
          return null;
        }

        if (filter.type === 'number' && conditionValue !== 'between') {
          formValue = +formValue;
        }

        return {
          type: filter.type,
          value: formValue,
          field: filter.field,
          condition: conditionValue,
        };
      })
      .filter((item) => !!item);
  }

  private patchFilterData() {
    this.subs.sink = this.filterService.filterData$.subscribe((filterData) => {
      const data = filterData.reduce(
        (a, v) => ({ ...a, [v.field]: v.value }),
        {}
      );
      this.filterForm.patchValue(data);
    });
  }
}
