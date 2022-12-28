import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Photo } from '../models/photo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  getAllPhotosUrl: string;
  constructor(private httpClient:HttpClient) {
    this.getAllPhotosUrl = "https://jsonplaceholder.typicode.com/photos";
  }

  getAllPhotos(): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.getAllPhotosUrl);
  }
}
