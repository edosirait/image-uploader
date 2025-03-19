import {Component, ElementRef, ViewChild} from '@angular/core';
import {ImageService} from '../services/image-service';
import {ToastService} from '../../shared/service/toast.service';

@Component({
  selector: 'app-upload-images',
  standalone: false,
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  previewUrl: string | null = null;

  constructor(
    private imageService: ImageService,
    private toastService: ToastService
  ) {}

  onFileSelected() {
    this.fileInput.nativeElement.click();
  }

  handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    this.imageService.uploadImage(file).subscribe({
      next: (res) => {
        const filename = res.filename || file.name;
        this.downloadImage(filename);
        this.toastService.show('Upload Successfully!');
      },
      error: (err) => {
        console.error('Upload Failed', err);
      }
    });
  }

  downloadImage(filename: string) {
    this.imageService.downloadImage(filename).subscribe({
      next: (blob) => {
        this.previewUrl = URL.createObjectURL(blob);
      },
      error: (err) => {
        console.error('Download Failed', err);
      }
    });
  }

}
