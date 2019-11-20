import { Injectable } from '@angular/core';
import { Student } from '../classes/student';
import { Transaction } from '../classes/transaction';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { DataStore } from '../classes/data-store';
import { Utils } from '../Utils/Utils';
import { Receipt } from '../classes/receipt';
import { Bill } from '../classes/bill';
import { CashBook } from '../classes/cash-book';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dataStore: DataStore = new DataStore();
  private isInitializing = false;
  private isInitialized = false;
  studentQ: any;
  expenseQ: any;


  constructor() {
  }

  public async initializeAsync(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (this.isInitializing) {
      while (this.isInitializing) {
        await Utils.sleep(100);
      }

      return;
    }

    this.isInitializing = true;

    await this.dataStore.loadDatabase();

    this.isInitializing = false;
    this.isInitialized = true;
  }


  public getStudents(): Observable<Student[]> {
    return of(this.dataStore.getStudents());
  }

  public getStudentById(id: string) {
    return this.dataStore.getStudentById(id);
  }

  public addStudent(student: Student) {
    this.dataStore.addStudent(student);
  }


  public updateStudent(student: Student) {
    student.lastdue = 0;
    student.issuedBillId.forEach((id: string) => {
      let bill = this.getBillById(id);
      if (bill && !bill.paid) {
        student.lastdue += bill.total;
      }
    });
    this.dataStore.updateStudent(student);
  }

  public removeStudent(student: Student) {
    this.dataStore.deleteStudent(student);
  }

  public getTransactions(): Transaction[] {
    return this.dataStore.getTransactions();
  }

  public addTransaction(transaction: Transaction) {
    this.dataStore.addTransaction(transaction);
  }

  public getReceipts(): Receipt[] {
    return this.dataStore.getReceipts();
  }

  public addReceipt(receipt: Receipt) {
    console.log(this.dataStore.addReceipt(receipt));

  }

  public getBills(): Bill[] {
    return this.dataStore.getBills();
  }

  public getBillById(id: string): Bill {
    return this.dataStore.getBillById(id);
  }

  public addBill(bill: Bill) {
    this.dataStore.addBill(bill);

  }
  public updateBill(bill: Bill) {
    this.dataStore.updateBill(bill);

  }

  public removeBill(bill: Bill) {
    this.dataStore.deleteBill(bill);
  }


  public getCurrentCashBook(): Observable<CashBook> {
    const name = new Date().getMonth().toString().concat(new Date().getFullYear().toString());
    let current = this.dataStore.getCashBookByName(name);
    if (current) {
      return of(current);
    } else {
      return of(this.dataStore.addCashBook(new CashBook()));

    }

  }

  public updateCashBook(cashbook: CashBook) {
    this.dataStore.updateCashBook(cashbook);
  }


}


