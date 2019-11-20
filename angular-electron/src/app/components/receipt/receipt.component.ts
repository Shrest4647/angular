import { Component, OnInit } from '@angular/core';
import * as numWords from 'num-words';
import { Receipt } from '../../classes/receipt';
import { Entry } from '../../models/entry';
import { DatabaseService } from '../../services/database.service';
import { Bill } from '../../classes/bill';
import { Student } from '../../classes/student';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  bill: Bill[] = [];
  student: Student;
  emptyStu = new Student();
  billNo: string;
  billId: string[] = [];
  studentId: string;
  receipt = new Receipt();
  payerdetail = false;

  constructor(private database: DatabaseService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.emptyStu.id = null;
    this.student = this.emptyStu;
  }

  sliceFromArray(index: number) {
    this.receipt.entries.splice(index, 1);
    this.snackBar.openSnackBar('spliced at ', index.toString());
  }

  addNewRow() {
    const newEntry: Entry = {
      particular: '',
      amount: 0
    };
    this.receipt.entries.push(newEntry);
    this.snackBar.openSnackBar('Added new Entry');
  }

  getStudent() {

    this.student = this.database.getStudentById(this.studentId);
    if (this.student) {
      this.payerdetail = true;
    } else {
      this.snackBar.openSnackBar('Student not found', 'Check student ID');
    }
  }

  clearBillOf() {
    this.billId = this.student.issuedBillId;

    if (this.billId) {
      this.billId.forEach(billNo => {
        let newBill = this.database.getBillById(billNo);
        if (!newBill.paid) {
          if (this.billNo) {
            this.billNo += ' ';
            this.billNo += billNo;
          } else {
            this.billNo = billNo;
          }

        }

      });
      this.addEntryFromBill();
    }
  }

  addEntryFromBill() {
    this.billId = this.billNo.split(' ');
    this.billId.forEach((billNo, index) => {
      this.bill[index] = this.database.getBillById(billNo);
      if (!this.bill[index]) {
        this.snackBar.openSnackBar('no bill with billNo', billNo);
        return;
      } else if (this.bill[index].paid) {
        this.snackBar.openSnackBar('bill already paid', billNo);
        return;

      } else {
        const now = new Date();
        const due = new Date(this.bill[index].dueDate);
        const diff = due.getTime() - now.getTime();

        if (diff < 0) {
          this.snackBar.openSnackBar('Adding late Fee for', billNo);
          this.receipt.entries.push({ particular: 'Late Fee', amount: 100, remark: 'lateFee for ' + billNo });

        }
        for (let i = 0; i < this.bill[index].entries.length; i++) {
          this.receipt.entries.push(this.bill[index].entries[i]);
        }
      }
    });
  }
  //saving receipt
  saveReceipt() {
    this.database.getCurrentCashBook().subscribe(cashbook => {
      if (cashbook.receipts.includes(this.receipt)) {
        this.snackBar.openSnackBar('This receipt already exists', 'not saved');
        return;
      }
      cashbook.receipts.push(this.receipt);
      this.database.updateCashBook(cashbook);
    });

    this.database.addReceipt(this.receipt);
    this.bill.forEach(bill => {
      if (bill) {
        bill.paid = true;
        this.database.updateBill(bill);
        this.database.updateStudent(this.database.getStudentById(bill.studentId));
      }

    })

    this.snackBar.openSnackBar('saved receipt', this.receipt.id);
  }

  PrintReceipt() {
    window.print();
  }

  numToWords(): string {
    return numWords(this.receipt.getTotal());
  }

  trackByIndex(index, item) {
    if (!item) { return null; }
    return index;
  }

}
