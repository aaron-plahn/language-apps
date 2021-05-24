import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDescriptionsComponent } from './pages/app-descriptions/app-descriptions.component';
import { RadioComponent } from './pages/radio/radio.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDescriptionsComponent,
    RadioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
