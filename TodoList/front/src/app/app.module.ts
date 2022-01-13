import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { TodoDescriptionComponent } from './components/todo-description/todo-description.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoTableComponent,
    TodoDescriptionComponent,
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
