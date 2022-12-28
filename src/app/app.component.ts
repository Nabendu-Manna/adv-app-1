import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostState } from './store/state/post.state';
import { Select, Store } from '@ngxs/store';
import { User } from './models/user.model';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adv-app';

  user!: User;

  @Select(PostState.getLogin) userLogin$!: Observable<User>;
  constructor(private store : Store,
    private authService: AuthService, private router: Router) {
    this.userLogin$.subscribe((userData: User) => {
      this.user = userData;
    });
  }

  logOut(){
    this.authService.getLogout();
    this.router.navigate(['/']);
  }

}
