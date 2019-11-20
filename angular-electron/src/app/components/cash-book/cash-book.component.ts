import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Transaction } from '../../classes/transaction';
import { CashBook } from '../../classes/cash-book';
import { DatabaseService } from '../../services/database.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.scss']
})
export class CashBookComponent implements OnInit {
  cashBook: CashBook;
  private newTransaction = new Transaction();
  showAddForm = false;
  RTF: boolean[] = [];
  TTF: boolean[] = [];

  constructor(private database: DatabaseService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.database.getCurrentCashBook().subscribe(cashBookRec => this.cashBook = cashBookRec);
  }

  toggleR(index) {
    this.RTF[index] = !this.RTF[index];
  }
  toggleT(index) {
    this.TTF[index] = !this.TTF[index];
  }
  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  addNewRow() {
    this.newTransaction.entries.push({
      particular: '',
      amount: 0,
      remark: ''
    });
  }

  addNewTransaction() {
    this.newTransaction.total = 0;
    this.newTransaction.entries.forEach((entry, index) => {
      if (entry.particular === '' || !entry.amount) {
        this.snackBar.openSnackBar('Transaction invalid', 'transaction at '.concat((index + 1).toString()), 2000);
        return;
      } else {
        this.newTransaction.total += entry.amount;
      }
    });
    this.cashBook.transactions.push(this.newTransaction);
    this.updateCashBook();

  }
  getTotalCash() {
    if (!this.cashBook) {
      return 0;
    } else {
      let total = 0;
      this.cashBook.receipts.forEach(receipt => {
        total += receipt.total;
      });
      this.cashBook.transactions.forEach(transaction => {
        if (transaction.type === 'debit') {
          total -= transaction.total;
        } else {
          total += transaction.total;
        }
      });
      return total;
    }
  }

  updateCashBook() {
    this.database.updateCashBook(this.cashBook);
  }

}
