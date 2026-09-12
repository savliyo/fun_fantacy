import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { mergetw } from '../../utils/tw-merge';

@Directive()
class BaseCardClass {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() class = '';

  protected initClass(baseClass: string) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      mergetw(baseClass, this.class)
    );
  }
}

@Directive({
  selector: '[mxCard]',
})
export class MxCardDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass(
      'rounded-lg border bg-background text-card-foreground shadow-sm'
    );
  }
}

@Directive({
  selector: '[mxCardtitle]',
})
export class MxCardTitleDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('text-sm font-semibold leading-none tracking-tight');
  }
}

@Directive({
  selector: '[mxCardHeader]',
})
export class MxCardHeaderDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('flex flex-col space-y-1.5 p-6');
  }
}

@Directive({
  selector: '[mxCardFooter]',
})
export class MxCardFooterDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('flex items-center p-6 pt-0');
  }
}

@Directive({
  selector: '[mxCardContent]',
})
export class MxCardContentDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('p-6 pt-0');
  }
}
