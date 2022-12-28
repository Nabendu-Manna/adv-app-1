import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Post } from "src/app/models/post.model";
import { User } from "src/app/models/user.model";
import { PostService } from "src/app/service/post.service";
import { GetAllPhotos, GetAllPost, GetLogout, GetPost, GetUserLogin } from "../actions/post.action";
import { tap } from "rxjs/operators";
import { Photo } from "src/app/models/photo.model";
import { PhotoService } from "src/app/service/photo.service";
// import { tap } from 'rxjs/operators';
// import { tap } from "rxjs/internal/operators/tap";

export interface PostStateModel {
  post : Post[];
  loaded: boolean;
  selectedPost: Post | null;
  photos: Photo[];
  loadedPhoto: boolean;

  userData: User;
}

@State<PostStateModel>({
  name: 'allPost',
  defaults: {
    post : [],
    loaded : false,
    selectedPost : null,
    photos: [],
    loadedPhoto : false,
    userData: {
      mobile: "9777777777",
      password: "nopass",
      email: "abc@test.com",
      isLogIn: true,
    }
  }
})

@Injectable()
export class PostState {

  constructor(
    private postService: PostService,
    private photoService: PhotoService
  ){}

  /*
  * Get all post
  */

  @Selector()
  static getAllPost(state: PostStateModel){
    return state.post;
  }

  @Action(GetAllPost)
  getAllPost({getState, setState} : StateContext<PostStateModel>){
    return this.postService.getAllPost().pipe(tap(response => {
      const state = getState();
      setState({
        ...state,
        post: response.slice(0, 10),
        loaded: true
      })
    }))
  }

  @Selector()
  static getPostLoaded(state: PostStateModel){
    return state.loaded;
  }


  /*
  * Get post details
  */
  @Selector()
  static getPost(state: PostStateModel){
    return state.selectedPost;
  }


  @Action(GetPost)
  getPost({ getState, setState } : StateContext<PostStateModel>, {id} : GetPost){
    const state = getState();
    const postList = state.post;
    const index = postList.findIndex(pos => pos.id == id);

    if(postList.length > 0){
      setState({
        ...state,
        selectedPost: postList[index]
      })
    } else {
      return this.postService.getPostById(id).pipe(tap((response: Post)=> {
        const state = getState();
        const postList = [response];
        setState({
          ...state,
          post: postList,
          selectedPost: postList[0]
        })
      }))
    }

    return null;

  }


  /*
  * Get all Photo
  */
  @Selector()
  static getAllPhotos(state: PostStateModel){
    return state.photos;
  }

  @Action(GetAllPhotos)
  getAllPosts({getState, setState} : StateContext<PostStateModel>){
    return this.photoService.getAllPhotos().pipe(tap(response => {

      const state = getState();
      setState({
        ...state,
        photos: response.slice(0, 10),
        loadedPhoto: true
      })
    }))
  }

  @Selector()
  static getPhotoLoaded(state: PostStateModel){
    return state.loadedPhoto;
  }



  @Selector()
  static isLogIn(state: PostStateModel){
    return state.userData.isLogIn;
  }


  @Selector()
  static getLogin(state: PostStateModel){
    let data = {
      mobile: state.userData.mobile,
      password:  state.userData.password,
      email: state.userData.email,
      isLogIn: state.userData.isLogIn,
    }
    return data;
  }

  @Selector()
  static getUserLogin(state: PostStateModel){
    return state.photos;
  }

  @Action(GetUserLogin)
  getUserLogin({getState, setState} : StateContext<PostStateModel>){
      const state = getState();
      let userD = state.userData;
      userD.isLogIn = true;
      setState({
        ...state,
        userData: userD
      })
  }

  @Selector()
  static GetLogout(state: PostStateModel){
    return state.photos;
  }

  @Action(GetLogout)
  GetLogout({getState, setState} : StateContext<PostStateModel>){
      const state = getState();
      let userD = state.userData;
      userD.isLogIn = false;
      setState({
        ...state,
        userData: userD
      })
  }
}
