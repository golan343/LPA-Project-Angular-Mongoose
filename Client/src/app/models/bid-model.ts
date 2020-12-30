import { isNgTemplate } from "@angular/compiler";
import { BidsService } from "../services/bids.service";

export class BidModel {
    public constructor() {
    }
    userId?: string;
    offer: string;
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
        this.winner = {};
        let minOffer = 0;
        if (bids) {
            const filteredObject = {};
            this.filteredObjectsArray = [];
            this.highest = 0;
            bids.forEach(item => {
                if (!filteredObject[item.offer]) {
                    filteredObject[item.offer] = [];
                }
                filteredObject[item.offer].push(item);
                minOffer = Math.max(parseFloat(item.offer), minOffer);
                this.maxLength = Math.max(this.maxLength, filteredObject[item.offer].length);
                this.minLength = Math.min(this.minLength, filteredObject[item.offer].length);
            });

            for (const prop in filteredObject) {
                if (filteredObject.hasOwnProperty(prop)) {
                    const element = filteredObject[prop];
                    let ob = {
                        bidId: element[0]._id,
                        val: prop,
                        relation: (100 * (element.length / this.maxLength)),
                        length: element.length,
                        item: element.length === this.minLength ? element[0] : null
                    };
                    if (element.length === this.minLength && parseFloat(prop) !== minOffer) {
                        minOffer = Math.min(parseFloat(prop), minOffer);
                        console.log(parseFloat(prop), minOffer);
                        this.winner = filteredObject[minOffer][0];
                    }
                    if (element.length === this.maxLength) {
                        this.mostCommon = parseFloat(prop);
                    }
                    this.highest = Math.max(parseFloat(prop), this.highest);
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

        }
    }
    filteredObjectsArray?: any[];
    maxLength: number;
    minLength: number;
    winner: any;
    mostCommon: number;
    highest: number;
}
