import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { PostService } from './service/post.service';
import { PhotosComponent } from './photos/photos.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

//Ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PostState } from './store/state/post.state';

import { MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './number-only.directive';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AllPostComponent,
    PhotosComponent,
    LoginComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    //Ngxs
    NgxsModule.forRoot([PostState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
