import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
import { mergetw } from '../utils/tw-merge';

@Component({
  selector: 'mx-svg-icon',
  standalone: true,
  imports: [NgClass],
  template: ``,
})
export class MxSvgIconComponent implements OnInit {
  protected sizes = {
    sm: '2',
    md: '4',
    lg: '6',
  };

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private http = inject(HttpClient);

  @Input({ required: true }) iconName!: string;
  @Input() iconClass = '';
  @Input() size: keyof typeof this.sizes = 'md';

  handleClick = output();

  ngOnInit(): void {
    if (this.iconName) {
      this.loadSvgIcon(this.iconName);
    }
  }

  private loadSvgIcon(iconName: string): void {
    const iconPath = `assets/icons/${iconName}.svg`;
    this.http.get(iconPath, { responseType: 'text' }).subscribe({
      next: (svg) => {
        const div = this.renderer.createElement('div');
        div.innerHTML = svg;
        const svgElement = div.querySelector('svg');

        this.renderer.setAttribute(
          svgElement,
          'class',
          mergetw(`w-${this.sizes[this.size]}`, this.iconClass)
        );

        this.renderer.listen(svgElement, 'click', () =>
          this.handleClick.emit()
        );

        this.renderer.appendChild(this.el.nativeElement, svgElement);
      },
      error: (error) => {
        console.error(`Could not load icon: ${iconPath}`, error);
      },
    });
  }
}
