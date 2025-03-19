import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from "primeng/dropdown";
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {UploadImagesComponent} from './upload-images/upload-images.component';
import {ToastComponent} from "../shared/toast/toast.component";

const routes: Routes = [
  { path: '', component: UploadImagesComponent },
];

@NgModule({
  declarations: [UploadImagesComponent],
  imports:
    [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule, DropdownModule,
      InputText,
      ButtonDirective, ToastComponent
    ]
})

export class FeaturesModule {}
