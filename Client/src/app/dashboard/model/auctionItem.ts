import {Auction} from "./../../models/auction-model"
export class UtilMethd{
    static getInputDateValue(date:string):string{
        if(!date) return '';
        const inputDate = new Date(date);
        console.log(inputDate,date);
        let month = inputDate.getMonth()+1;
        let monthStr = month<10?'0'+month:month+'';
        let dateT = inputDate.getDate();
        let dateTStr = dateT<10?'0'+dateT:dateT+'';
        return inputDate.getFullYear()+'-'+monthStr+'-'+dateTStr;
    }
}
export class auctionItem {
    constructor(auction?:Auction){
        for(let prop in auction){
            this[prop] = auction[prop]
        }
        this.selected = false;
        this.endDate = UtilMethd.getInputDateValue(this.endDate);
        this.startDate = UtilMethd.getInputDateValue(this.startDate);
       
    }
    createdDate:Date;
    winPrice:number;
    avgRating:string;
    ruleId:string;
    createdBy:string;
    
    selected?:boolean;
    bidPrice: string;
    bidsCount: number;
    description: string;
    endDate: string;
    imageFileName: string;
    maxOffer: number;
    minOffer: number;
    name: string;
    price: string;
    startDate: string;
    status: boolean;
    totalBid: number;
    youtubeId: string;
    previousImage:string;
    isActive:boolean;
    _id:string;
}