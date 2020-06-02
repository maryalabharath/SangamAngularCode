import { AnjumanMemberRegistration } from './anjuman_memreg';
import { AnujumanType } from './anjumantype';

export interface AnjumanLoanIssued {
    loannumber: number;
    createDate?: any;
    issuedamount: number;
    modifyDate: number;
    noofinstallments?: any;
    status?: any;
    surity1address: string;
    surity1mobilenumber: string;
    surity1name: string;
    surity2address: string;
    surity2mobilenumber: string;
    surity2name: string;
    anjumanLoanpayment?: any;
    anjumanMemberregistration?: AnjumanMemberRegistration;
    anjumantype?: AnujumanType;
}
