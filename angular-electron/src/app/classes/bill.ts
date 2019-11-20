import * as nanoid from 'nanoid/generate';
import { Entry } from '../models/entry';


export class Bill {

    id: string;
    entries: Entry[] = [];
    firstDate?: Date;
    lastDate?: Date;
    dueDate?: Date;
    total: number;
    paid = false;
    remark?: string;
    studentId?: string;

    constructor() {
        this.id = nanoid('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 2) + nanoid('0123456789', 5);
    }

    getEntry() {
        return this.entries;
    }
}
