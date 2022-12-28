import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: 'all/post', loadChildren: () => import('./all-post/all-post.module').then(m => m.AllPostModule) },
  { path: 'post/:id', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  { path: 'photos', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule), canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
