import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BballComponent } from './bball/bball.component';
import { MytableComponent } from './mytable/mytable.component';
import {Table2CellService} from "./table2-cell.service";


@NgModule({
  declarations: [
    AppComponent,
    BballComponent,
    MytableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Table2CellService],
  bootstrap: [AppComponent]
})
export class AppModule { }
