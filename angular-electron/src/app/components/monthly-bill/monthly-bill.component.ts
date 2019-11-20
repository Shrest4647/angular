import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import * as adbs from 'ad-bs-converter';
import { Student } from '../../classes/student';
import { Bill } from '../../classes/bill';
import { SnackbarService } from '../../services/snackbar.service';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-monthly-bill',
  templateUrl: './monthly-bill.component.html',
  styleUrls: ['./monthly-bill.component.scss']
})
export class MonthlyBillComponent implements OnInit {
  billSaved = false;
  choice: string;
  monthName: string;
  dueDay: number;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  examFee = false;
  studentList: Student[];
  showList: Array<Student> = [];
  showBill = false;
  billList: Bill[] = [];
  SN: number;
  year = ['Baishakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Asoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
  constructor(private database: DatabaseService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.database.getStudents().subscribe(arg => this.studentList = arg);
    console.log(adbs.ad2bs('now', new Date()));
  }

  generateBill() {

    this.studentList.forEach((stu: Student) => {
      if (stu.grade === this.choice || this.choice === '**') {
        const bill = new Bill();
        bill.studentId = stu.id;
        bill.firstDate = this.startDate;
        bill.lastDate = this.endDate;
        bill.dueDate = this.dueDate;
        bill.remark = this.monthName;
        bill.total = 0;
        if (stu.tutionFee) {
          bill.entries.push({ particular: 'Tution Fee', amount: stu.tutionFee, remark: 'bill ' + bill.id });
          bill.total += stu.tutionFee;
        }
        if (stu.transportationFee) {
          bill.entries.push({ particular: 'Transportation Fee', amount: stu.transportationFee, remark: 'bill ' + bill.id });
          bill.total += stu.transportationFee;
        }
        if (stu.computerFee) {
          bill.entries.push({ particular: 'Computer Fee', amount: stu.computerFee, remark: 'bill ' + bill.id });
          bill.total += stu.computerFee;
        }
        if (this.examFee) {
          bill.entries.push({ particular: 'Exam Fee', amount: stu.examFee, remark: 'ExamFee' });
          bill.total += stu.examFee;
        }


        this.showList.push(stu);
        this.billList.push(bill);

      }
    });
    this.showBill = true;

  }


  resetSerialNo() {
    this.SN = 1;
    return this.SN;
  }


  Serial() {
    return ++this.SN;
  }

  saveBill() {
    if (this.billSaved) {
      this.snackBar.openSnackBar('The bill is already saved', 'create new bill');
    }
    this.billList.forEach((bill: Bill, index: number) => {
      this.showList[index].issuedBillId.push(bill.id);
      this.database.updateStudent(this.showList[index]);
      this.database.addBill(bill);
    });

    this.snackBar.openSnackBar('saved Bill', '');

  }

  printPage() {
    let content = document.getElementById('previewSection');
    console.log(content);
    ipcRenderer.send('print', content);
  }

  createNewBill() {
    this.billList = [];
    this.showList = [];
    this.showBill = false;
  }
}
