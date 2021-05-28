import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { RadioComponent } from './pages/radio/radio.component';
import { SongIndexComponent } from './pages/song-index/song-index.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { MediaItemNamePipe } from './pipes/media-item-name.pipe';
import { VideoIndexComponent } from './pages/video-index/video-index.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DialectComponent } from './pages/dialect/dialect.component';
import { FundersComponent } from './pages/funders/funders.component';
import { LinksComponent } from './pages/links/links.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDescriptionsComponent,
    RadioComponent,
    SongIndexComponent,
    SongDetailComponent,
    MediaItemNamePipe,
    VideoIndexComponent,
    VideoDetailComponent,
    ContactComponent,
    DialectComponent,
    FundersComponent,
    LinksComponent,
    TeachersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
