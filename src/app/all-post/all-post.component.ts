import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { GetAllPost } from '../store/actions/post.action';
import { PostState } from '../store/state/post.state';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit, OnDestroy {

  allPost!: Post[];
  postLoadedSub!: Subscription;

  @Select(PostState.getAllPost) allPost$!: Observable<Post[]>;
  @Select(PostState.getPostLoaded) postLoaded$!: Observable<boolean>;

  constructor(
    private store : Store
  ) { }

  ngOnInit(): void {
    this.getAllPostData();
    this.allPost$.subscribe(res => {
      this.allPost = res;
    });

    // this.postService.getAllPost().subscribe(response => {
    //   console.log(response);
    // });
  }

  getAllPostData(){
    this.postLoadedSub = this.postLoaded$.subscribe( postLoaded => {
      if(!postLoaded)
        this.store.dispatch(new GetAllPost());
    })
  }

  ngOnDestroy(): void {
    this.postLoadedSub.unsubscribe();
  }
}
