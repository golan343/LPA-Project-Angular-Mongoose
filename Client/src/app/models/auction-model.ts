import { UtilMethd } from "../dashboard/model/auctionItem";

export class Auction {
    constructor() {
    }
    _id: string;
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
    youtubeId: string;
    winPrice:number;
    avgRating:string;
    ruleId:string;
    createdBy:string;
    siteId?: string;
    previousImage: string;
}
export class AuctionModel extends Auction {
    bidsRemains: number;
    bidPattern: any;
    selected: boolean;
    public constructor(auction?:Auction) {
        super();
        for(let prop in auction){
            this[prop] = auction[prop]
        }
        this.status = auction?.status ?? false;
        this.endDate = UtilMethd.getInputDateValue(this.endDate);
        this.startDate = UtilMethd.getInputDateValue(this.startDate);
        this.selected = false;
        if (!this.bidPattern) {
            this.bidPattern = "0.5";
        }
        if (Number(this.bidsCount) && Number(this.totalBids))
            this.bidsRemains = Number(this.totalBids) - Number(this.bidsCount)
    }
    createdBy: string;
}

