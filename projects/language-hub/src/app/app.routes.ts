import { Routes } from '@angular/router';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DialectComponent } from './pages/dialect/dialect.component';
import { RadioComponent } from './pages/radio/radio.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { SongIndexComponent } from './pages/song-index/song-index.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { VideoIndexComponent } from './pages/video-index/video-index.component';

// TODO comment components back in as migrated
export const routes: Routes = [
    // {"path": "", "component": HomeComponent},
    {"path": "radio", "component": RadioComponent},
    {"path": "dialect", "component": DialectComponent},
    {"path": "songs/:id", "component": SongDetailComponent},
    {"path": "songs", "component": SongIndexComponent},
    {"path": "videos/:id", "component": VideoDetailComponent},
    {"path": "videos", "component": VideoIndexComponent},
    {"path": "apps", "component": AppDescriptionsComponent},
    // {"path": "links", "component": LinksComponent},
    // {"path": "teachers", "component": TeachersComponent},
    // {"path": "funders", "component": FundersComponent},
    {"path": "contact", "component": ContactComponent}
  ];