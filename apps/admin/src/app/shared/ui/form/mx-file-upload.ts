import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  input,
  Input,
  Output,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MxHintComponent } from '../hint';
import { MxCardModule } from '../card/card.module';
import { MxSvgIconComponent } from '../svg-icon';
import { MxButtonComponent } from '../button';
import { MxImageComponent } from '../display-image';
import { MxOverlayComponent } from '../overlay';
import { MxTooltipDirective } from '../tooltip/tooltip.directive';
@Component({
  selector: 'mx-file-upload',
  standalone: true,
  imports: [
    MxHintComponent,
    MxCardModule,
    MxSvgIconComponent,
    MxButtonComponent,
    MxImageComponent,
    MxOverlayComponent,
    MxTooltipDirective,
  ],
  template: `
    <div class="w-full max-w-md bg-background border  rounded-lg p-6 relative">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class=" text-md font-bold">
            {{ label ? label : 'Media' }}
          </h3>
          <p class=" text-xs mt-1">{{ description() }}</p>
          @for (hint of internalHints(); track hint) {
          <mx-hint [message]="hint" />
          }
        </div>
        <div
          class="pt-4 min-h-[40px] flex flex-col items-start justify-center text-center cursor-pointer"
        >
          <mx-button (handleClick)="choose()">
            <span class="flex gap-2" for="chooseFile">
              <mx-svg-icon
                iconName="file-upload"
                iconClass="w-4 inline-block"
              />
              <p class="mt-0.5">Upload</p>
            </span>
          </mx-button>
          <input
            #fileInput
            [multiple]="multiple"
            (change)="internalFileHandler($event)"
            [accept]="accept()"
            type="file"
            id="chooseFile"
            class="hidden"
          />
        </div>
      </div>

      @for (file of selectedFiles(); track file.name; let index = $index) {
      <div
        class="flex flex-col bg-background border shadow-lg p-4 rounded-lg mt-4"
      >
        <div class="flex items-center gap-2">
          @if (file['previewURL']) {
          <mx-overlay spacingClass="p-4">
            <mx-image
              [fileURL]="file['previewURL']"
              imageClass="w-5"
              mxTooltip="Click to preview"
              alt="small Image"
              trigger
            />
            <mx-image [fileURL]="file['previewURL']" alt="Preview image" />
          </mx-overlay>

          } @else {
          <mx-svg-icon iconName="file" iconClass="fill-current inline-block" />
          }
          <div class="flex-1 mt-1">
            <p class="text-xs  ">
              {{ file.name }}
              <span class="ml-2">{{ file['sizeInMb'] }} mb</span>
            </p>
            @if (file['fizeSizeError']) {
            <mx-hint [message]="file['fizeSizeError']" type="error" />
            }
          </div>
          <mx-svg-icon
            iconName="close"
            iconClass="cursor-pointer"
            (handleClick)="removeFile(index)"
          />
        </div>
      </div>
      }
    </div>
  `,
})
export class MxFileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined | any;
  @Output() handleFileChange = new EventEmitter();

  @Input() showFileSize = true;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input() label = 'Media';
  @Input() previewImages = false;
  description = input<string>('');
  accept = input<string>('*');
  maxFileSizeMB = input<number>();
  hints = input<string[]>([]);

  private previewableMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  private allSelectedFiles: WritableSignal<File[]> = signal([]);
  selectedFiles: Signal<File[]> = computed(() => this.refineFiles());

  protected errors = signal<string[]>([]);
  protected internalHints = computed(() => {
    const hints = this.hints();
    if (this.maxFileSizeMB()) {
      hints.push(`Max file size: ${this.maxFileSizeMB()} MB`);
    }
    return hints;
  });

  protected choose() {
    this.fileInput?.nativeElement.click();
  }

  protected removeFile(index: number) {
    const files = this.allSelectedFiles();
    files.splice(index, 1);
    this.allSelectedFiles.set([...files]);
  }

  protected internalFileHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      return;
    }
    const files = Array.from(target.files);

    if (this.multiple) {
      this.handleMultipleFiles(files);
      return;
    }
    this.handleSingleFile(files);
  }

  private handleMultipleFiles(files: File[]) {
    this.allSelectedFiles.set([...this.allSelectedFiles(), ...files]);
    this.handleFileChange.emit(this.allSelectedFiles());
  }

  private handleSingleFile(files: File[]) {
    this.allSelectedFiles.set(files);
    const file = files[0];
    this.handleFileChange.emit(file);
  }

  private refineFiles() {
    return this.allSelectedFiles().map((file) => {
      if (file['processed']) {
        return file;
      }

      // processed flag
      file['processed'] = true;

      if (this.previewImages && this.isFilePreviewable(file)) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          file['previewURL'] = e.target?.result;
        };
        reader.readAsDataURL(file);
      }

      // size in mb
      const sizeInMb = this.fileSizeMB(file.size);
      file['sizeInMb'] = sizeInMb;
      const maxFileSizeMB = this.maxFileSizeMB();

      // handle max file size validation
      if (maxFileSizeMB && sizeInMb > maxFileSizeMB) {
        file[
          'fizeSizeError'
        ] = `File size should be less then ${maxFileSizeMB} MB, it is ${sizeInMb} MB`;
      }

      return file;
    });
  }

  private fileSizeMB(size: number) {
    const mb = size / (1024 * 1024);
    return parseFloat(mb.toFixed(2));
  }

  private isFilePreviewable(file: File): boolean {
    return this.previewableMimeTypes.includes(file.type);
  }
}
