import * as nanoid from 'nanoid/generate';
import { Bill } from './bill';

export class Student {
    id: string;
    firstName: string;
    lastName: string;
    grade: string;
    roll?: number;
    DOB?: Date;
    gender?: 'M'|'F';
    tutionFee: number;
    transportationFee?: number;
    computerFee?: number;
    examFee?: number;
    guardian?: string;
    contact?: string;
    address?: string;
    image?: string;
    issuedBillId?: string[] = [];
    lastdue: number;

    constructor() {
        this.id = nanoid('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1) + nanoid('0123456789', 4);
        this.lastdue = 0;
    }


}

