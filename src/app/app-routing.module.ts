import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'soal', loadChildren: './soal/soal.module#SoalPageModule' },
  { path: 'hasil', loadChildren: './hasil/hasil.module#HasilPageModule' },
  { path: 'pass', loadChildren: './pass/pass.module#PassPageModule' },
  { path: 'test-soal', loadChildren: './test-soal/test-soal.module#TestSoalPageModule' },
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
