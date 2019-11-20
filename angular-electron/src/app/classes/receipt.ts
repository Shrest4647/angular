import * as nanoid from 'nanoid/generate';
import { Entry } from '../models/entry';


export class Receipt {
    id: string;
    entries: Entry[] = [];
    date?: Date;
    total: number;
    remarks?: string;

    constructor() {
        this.id = nanoid('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 2) + nanoid('0123456789', 5);
        this.date = new Date();
    }

    getEntry() {
        return this.entries;
    }

    getTotal() {
        let sum = 0;
        this.entries.forEach(e => {
            sum += e.amount;
        });
        this.total = sum;
        return this.total;
    }
}
