import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { RadioComponent } from './pages/radio/radio.component';
import { SongIndexComponent } from './pages/song-index/song-index.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDescriptionsComponent,
    RadioComponent,
    SongIndexComponent,
    SongDetailComponent
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
