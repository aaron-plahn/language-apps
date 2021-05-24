import { Routes } from '@angular/router';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { RadioComponent } from './pages/radio/radio.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { SongIndexComponent } from './pages/song-index/song-index.component';

// TODO comment components back in as migrated
export const routes: Routes = [
    // {"path": "", "component": HomeComponent},
    {"path": "radio", "component": RadioComponent},
    // {"path": "dialect", "component": DialectComponent},
    {"path": "songs/:id", "component": SongDetailComponent},
    {"path": "songs", "component": SongIndexComponent},
    // {"path": "videos", "component": VideosComponent},
    {"path": "apps", "component": AppDescriptionsComponent},
    // {"path": "links", "component": LinksComponent},
    // {"path": "teachers", "component": TeachersComponent},
    // {"path": "funders", "component": FundersComponent},
    // {"path": "contact", "component": ContactComponent}
  ];