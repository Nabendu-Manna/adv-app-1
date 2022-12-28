import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../service/post.service';
import { GetPost } from '../store/actions/post.action';
import { PostState } from '../store/state/post.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post!: Post;
  postLoadedSub!: Subscription;

  id!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private store : Store
  ) { }


  @Select(PostState.getPost) postDetails$!: Observable<Post>;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getPostDataById(this.id);
  }

  getPostDataById(id: number) {
    this.store.dispatch(new GetPost(id));
    this.postLoadedSub = this.postDetails$.subscribe(response => {
      this.post = response;
    })
  }

  ngOnDestroy(): void {
    this.postLoadedSub.unsubscribe();
  }
}
