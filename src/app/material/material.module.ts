import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

const materialComponents = [ 
  MatTabsModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatCardModule,
  MatPaginatorModule
]
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
  providers : [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class MaterialModule { }
