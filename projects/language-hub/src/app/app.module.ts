import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DialectComponent } from './pages/dialect/dialect.component';
import { FundersComponent } from './pages/funders/funders.component';
import { HomeComponent } from './pages/home/home.component';
import { LinksComponent } from './pages/links/links.component';
import { RadioComponent } from './pages/radio/radio.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { SongIndexComponent } from './pages/song-index/song-index.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { VideoIndexComponent } from './pages/video-index/video-index.component';
import { MediaItemNamePipe } from './pipes/media-item-name.pipe';
import { FooterComponent } from './widgets/footer/footer.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDescriptionsComponent,
    ContactComponent,
    DialectComponent,
    FooterComponent,
    FundersComponent,
    HomeComponent,
    LinksComponent,
    MediaItemNamePipe,
    NavbarComponent,
    RadioComponent,
    SongDetailComponent,
    SongIndexComponent,
    TeachersComponent,
    VideoDetailComponent,
    VideoIndexComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
