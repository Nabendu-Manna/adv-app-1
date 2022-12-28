import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostState } from '../store/state/post.state';
import { Select, Store } from '@ngxs/store';
import { User } from '../models/user.model';
import { GetLogout, GetUserLogin } from '../store/actions/post.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Select(PostState.getLogin) userLogin$!: Observable<User>;
  constructor(private store : Store) { }

  getAuthStatus(): any{
    let userD: boolean = false;
    this.userLogin$.subscribe((userData: User) => {
      userD = userData.isLogIn;
    });
    return userD;
  }

  getLogin(data: any): any {
    let userD: any = null;
    this.userLogin$.subscribe((userData: User) => {
      userD = userData;
    });

    if(userD.mobile == data.mobile && userD.password == data.password){
      this.store.dispatch(new GetUserLogin(data));
    }
  }

  getLogout() {
    this.store.dispatch(new GetLogout());
    
  }
}
