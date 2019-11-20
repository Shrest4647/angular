import * as nanoid from 'nanoid';
import { Entry } from '../models/entry';

export class Transaction {
    id: string;
    type: string;
    entries: Entry[] = [];
    date: Date;
    total: number;
    remarks?: string;

    constructor() {
        this.id = nanoid(10);
        this.date = new Date();
    }

    getEntry() {
        return this.entries;
    }



}
