import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Photo } from '../models/photo.model';
import { GetAllPhotos } from '../store/actions/post.action';
import { PostState } from '../store/state/post.state';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {

  allPhoto!: Photo[];
  photoLoadedSub!: Subscription;

  @Select(PostState.getAllPhotos) allPhoto$!: Observable<Photo[]>;
  @Select(PostState.getPhotoLoaded) photoLoaded$!: Observable<boolean>;

  constructor(
    private store : Store
  ) { }


  ngOnInit(): void {
    this.getAllPostData();
  }

  getAllPostData(){
    this.photoLoadedSub = this.photoLoaded$.subscribe(photoLoaded => {
      if(!photoLoaded)
        this.store.dispatch(new GetAllPhotos());
    })

    this.allPhoto$.subscribe(res => {
      this.allPhoto = res;
    });
  }

  ngOnDestroy(): void {
    this.photoLoadedSub.unsubscribe();
  }
}
