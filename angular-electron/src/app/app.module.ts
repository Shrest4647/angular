import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { DatabaseService } from './services/database.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { MonthlyBillComponent } from './components/monthly-bill/monthly-bill.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { CashBookComponent } from './components/cash-book/cash-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatRadioModule } from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReadcsvComponent } from './components/readcsv/readcsv.component';
import { LoginComponent } from './components/login/login.component';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,
    AddStudentComponent,
    ViewStudentsComponent,
    NavbarComponent,
    StudentDetailComponent,
    MonthlyBillComponent,
    SlideshowComponent,
    ReceiptComponent,
    ViewBillComponent,
    CashBookComponent,
    DashboardComponent,
    DataTableComponent,
    ToolbarComponent,
    SidenavComponent,
    ReadcsvComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
