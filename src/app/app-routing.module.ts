import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'feature2',
        loadChildren: () => import('@modules/feature2/feature2.module').then(m => m.Feature2Module)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
