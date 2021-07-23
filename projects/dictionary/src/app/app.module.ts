import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TermDetailComponent } from './components/pages/term-detail/term-detail.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { VocabularyListComponent } from './components/pages/vocabulary-list/vocabulary-list.component';
import { VocabularyListsComponent } from './components/pages/vocabulary-lists/vocabulary-lists.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { ListControlComponent } from './components/widgets/list-control/list-control.component';
import { SwitchComponent } from './components/widgets/switch/switch.component';
import { TermComponent } from './components/widgets/term/term.component';
import { CopyrightPipe } from './pipes/copyright/copyright.pipe';
import { DisplayVocabularyListNamePipe } from './pipes/display-vocabulary-list-name/display-vocabulary-list-name.pipe';
import { TableComponent } from './components/widgets/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyListComponent,
    HomeComponent,
    DropdownComponent,
    SwitchComponent,
    VocabularyListsComponent,
    DisplayVocabularyListNamePipe,
    ListControlComponent,
    TermComponent,
    CopyrightPipe,
    TermsComponent,
    TermDetailComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
