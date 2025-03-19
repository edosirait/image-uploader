import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-toast',
  template: `
    <div *ngIf="message" class="toast">{{ message }}</div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    NgIf
  ],
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe((msg) => {
      this.message = msg;
      setTimeout(() => (this.message = null), 3000);
    });
  }
}
