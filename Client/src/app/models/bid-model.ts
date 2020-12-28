import { isNgTemplate } from "@angular/compiler";
import { BidsService } from "../services/bids.service";

export class BidModel {
    public constructor() {
    }
    userId?: string;
    offer: number;
    auctionId?: string;
    date?: Date;
    bidPrice: string;
    bidsCount: number;
    createdDate: Date;
    description: string;
    endDate: string;
    imageFileName: string;
    maxOffer: number;
    minOffer: number;
    name: string;
    price: string;
    startDate: string;
    status: boolean;
    totalBids: number;
    _id: string;
}
export class AuctionBidData {
    constructor(bids?: BidModel[]) {
        this.maxLength = 0;
        this.minLength = bids.length;
        this.steps = [];
        if (bids) {
            const filteredObject = {};
            this.filteredObjectsArray = [];
            bids.forEach(item => {
                if (!filteredObject[item.offer]) {
                    filteredObject[item.offer] = [];
                }
                filteredObject[item.offer].push(item);
                this.maxLength = Math.max(this.maxLength, filteredObject[item.offer].length);
                this.minLength = Math.min(this.minLength, filteredObject[item.offer].length);
            });
            for (const prop in filteredObject) {
                if (filteredObject.hasOwnProperty(prop)) {
                    const element = filteredObject[prop];
                    let ob = {
                        val: prop,
                        relation: (100 * (element.length / this.maxLength)),
                        length: element.length,
                        minOffer: element.length === this.minLength ? element[0] : {}
                    };
                    this.filteredObjectsArray.push(ob);
                }
            }
            this.filteredObjectsArray = this.filteredObjectsArray.sort((a, b) => {
                if (a.val > b.val) {
                    return -1;
                }
                if (a.val < b.val) {
                    return 1;
                }
                return 0;
            })
            // steps
         
            for (let i = 0; i <= this.maxLength; i++) {
                this.steps.push(i);
            }
        }
    }
    filteredObjectsArray?: any[];
    maxLength: number;
    minLength: number;
    steps: number[];
}
