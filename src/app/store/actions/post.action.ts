import { Post } from "src/app/models/post.model";
import { Photo } from "src/app/models/photo.model";

export class GetAllPost {
  static readonly type = '[Post] GetAll';

  // constructor(public payload:Post){}
}

export class GetPost {
  static readonly type = '[Post] Get';
  constructor(public id: number){}
}

export class GetAllPhotos {
  static readonly type = '[Photo] Get';
}

export class GetPhotoByName {
  static readonly type = '[Photo] GetByName';
  constructor(public key: string){}
}

export class GetUserLogin {
  static readonly type = '[User] GetLogin';
  constructor(public payload: any){}
}

export class GetLogout {
  static readonly type = '[User] GetLogout';
}
