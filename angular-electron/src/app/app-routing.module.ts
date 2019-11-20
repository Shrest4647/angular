import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { MonthlyBillComponent } from './components/monthly-bill/monthly-bill.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ViewBillComponent } from './components/view-bill/view-bill.component';
import { CashBookComponent } from './components/cash-book/cash-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
  {
    path: 'login',
    component: LoginComponent
  },
  //cashBook
  {
    path: 'cashBook',
    component: CashBookComponent
  },
  // add section
  {
    path: 'add',
    component: AddStudentComponent
  },
  {
    path: 'receipt',
    component: ReceiptComponent
  },
  {
    path: 'monthlyBill',
    component: MonthlyBillComponent
  },
// view section
  {
    path: 'view/student',
    component: ViewStudentsComponent
  },
  {
    path: 'view/:id',
    component: StudentDetailComponent
  },
  {
    path: 'view/bill/:id',
    component: ViewBillComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
