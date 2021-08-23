import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { VisualizationComponent } from './visualization/visualization.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiInMemoryDataService } from './services/api-in-memory-data.service';
import { CaptureScreenComponent } from './capture-screen/capture-screen.component';
import {ReactiveFormsModule} from  '@angular/forms'; 
import {DatePipe} from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent,
    CaptureScreenComponent,
    ContactDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ApiInMemoryDataService, { delay: 0 }),
    ReactiveFormsModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
