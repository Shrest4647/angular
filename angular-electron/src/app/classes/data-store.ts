import * as loki from 'lokijs';
import { Student } from '../classes/student';
import { Transaction } from '../classes/transaction';
import * as nanoid from 'nanoid';
import { Bill } from './bill';
import { Receipt } from './receipt';
import { CashBook } from './cash-book';


export class DataStore {
    constructor() { }

    private db: loki;
    private studentQ: any;
    private transactionQ: any;
    private receiptQ: any;
    private billQ: any;
    private cashBook: any;

    private isLoaded = false;

    public loadDatabase() {
        this.isLoaded = false;
        this.db = new loki('schoolData.db', {
            autoload: true,
            autoloadCallback: this.databaseInitialize.bind(this),
            autosave: true,
            autosaveInterval: 10000
        });
    }
    // implement the autoloadback referenced in loki constructor
    private databaseInitialize() {
        let mustSaveDatabase = false;
        this.studentQ = this.db.getCollection('studentList');
        if (this.studentQ === null) {
            this.studentQ = this.db.addCollection('student');
            mustSaveDatabase = true;
        }

        this.transactionQ = this.db.getCollection('transaction');
        if (this.transactionQ === null) {
            this.transactionQ = this.db.addCollection('transaction');
            mustSaveDatabase = true;
        }
        this.receiptQ = this.db.getCollection('receipt');
        if (this.receiptQ === null) {
            this.receiptQ = this.db.addCollection('receipt');
            mustSaveDatabase = true;
        }

        this.billQ = this.db.getCollection('bill');
        if (this.billQ === null) {
            this.billQ = this.db.addCollection('bill');
            mustSaveDatabase = true;
        }

        this.cashBook = this.db.getCollection('cashBook');
        if (this.cashBook === null) {
            this.cashBook = this.db.addCollection('cashBook');
            mustSaveDatabase = true;
        }

        if (mustSaveDatabase) {
            this.db.saveDatabase();
        }

        this.isLoaded = true;

        console.log('database initialized');
    }


    // Exposed properties

    public getStudentById(id: nanoid): Student {
        return this.studentQ.find({ 'id': id })[0];
    }

    public getStudents(): Student[] {
        let students: Student[] = this.studentQ.chain().data();
        return students;
    }

    public addStudent(studentExample: Student): string {
        this.studentQ.insert(studentExample);
        this.db.saveDatabase();

        return studentExample.firstName;
    }

    public updateStudent(studentExample: Student) {
        this.studentQ.update(studentExample);
        this.db.saveDatabase();
    }

    public deleteStudent(studentToDelete: Student): void {
        this.studentQ.remove(studentToDelete);
        this.db.saveDatabase();
    }

    public getTransactionById(id: nanoid): Transaction {
        return this.transactionQ.find({ 'id': id })[0];
    }

    public getTransactions(): Transaction[] {
        let transactions: Transaction[] = this.transactionQ.chain().data();
        return transactions;
    }

    public addTransaction(transactionExample: Transaction): nanoid {
        this.transactionQ.insert(transactionExample);
        this.db.saveDatabase();

        return transactionExample.id;
    }


    public updateTransaction(transactionExample: Transaction) {
        this.transactionQ.update(transactionExample);
        this.db.saveDatabase();


    }

    public deleteTransaction(id: nanoid): void {
        const transactionToDelete = this.getTransactionById(id);
        this.transactionQ.remove(transactionToDelete);
        this.db.saveDatabase();
    }

    public getBillById(id: nanoid): Bill {
        return this.billQ.chain().find({ 'id': id }).data()[0];
    }

    public getBills(): Bill[] {
        let bills: Bill[] = this.billQ.chain().data();
        return bills;
    }

    public addBill(billExample: Bill): nanoid {
        this.billQ.insert(billExample);
        this.db.saveDatabase();

        return billExample.id;
    }
    public updateBill(billExample: Bill) {
        this.billQ.update(billExample);
        this.db.saveDatabase();

        return billExample.id;
    }

    public deleteBill(billToDelete: Bill): void {

        this.billQ.remove(billToDelete);
        this.db.saveDatabase();
    }

    public getReceiptById(id: nanoid): Receipt {
        return this.receiptQ.find({ 'id': id })[0];
    }

    public getReceipts(): Receipt[] {
        let receipts: Receipt[] = this.receiptQ.chain().data();
        return receipts;
    }

    public addReceipt(receiptExample: Receipt): nanoid {
        this.receiptQ.insert(receiptExample);
        this.db.saveDatabase();

        return receiptExample.id;
    }

    public deleteReceipt(id: nanoid): void {
        const receiptToDelete = this.getReceiptById(id);
        this.receiptQ.remove(receiptToDelete);
        this.db.saveDatabase();
    }

    public getCashBookByName(name: string): CashBook {
        return this.cashBook.find({ 'name': name })[0];
    }

    public getCashBooks(): CashBook[] {
        let cashbooks: CashBook[] = this.cashBook.chain().data();
        return cashbooks;
    }

    public addCashBook(cashBookExample: CashBook): CashBook {
        this.cashBook.insert(cashBookExample);
        this.db.saveDatabase();

        return cashBookExample;
    }


    public updateCashBook(cashBookExample: CashBook) {
        this.cashBook.update(cashBookExample);
        this.db.saveDatabase();
    }












}
