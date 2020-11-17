export class AuctionModel {
    public constructor(
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public siteId?: string,
        public ruleId?: string,
        public name?: string,
        public winPrice?: string,
        public youtubeId?: string,
        public startDate?: string,
        public endDate?: string,
        public imageFileName?: string,
        public price?: string,
        public description?: string,
        public status?: string,
        public createdDate?: string,
        public minOffer?: string,
        public maxOffer?: string,
        public totalBids?: number,
        public bidPattern?: string,
        public bidPrice?: string,
        public createdBy?: string
    ) { }
}
