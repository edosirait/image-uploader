import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
  { path: '', redirectTo: '/feature', pathMatch: 'full' },
  { path: '**', redirectTo: '/feature' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
