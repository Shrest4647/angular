import { Transaction } from './transaction';
import { Receipt } from './receipt';
import * as nanoid from 'nanoid';



export class CashBook {
    date: Date;
    name: string;
    id: string;
    transactions: Transaction[] = [];
    receipts: Receipt[] = [];

    constructor() {
        this.id = nanoid(4);
        this.date = new Date();
        this.name = this.date.getMonth().toString().concat(this.date.getFullYear().toString())  ;
    }
}
