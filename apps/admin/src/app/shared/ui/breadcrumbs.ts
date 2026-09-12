import { Component, Input } from '@angular/core';

@Component({
  selector: 'mx-breadcrumbs',
  standalone: true,
  template: `<ol class="flex items-center whitespace-nowrap">
    <li class="inline-flex items-center">
      <a
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
        href="#"
      >
        Dashboard
        <svg
          class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>
    </li>
    <li
      class="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
      aria-current="page"
    >
      Match
    </li>
  </ol>`,
})
export class MxBreadcrumbsComponent {
  @Input({ required: true }) data: { name: string; link: string }[] = [];
}
