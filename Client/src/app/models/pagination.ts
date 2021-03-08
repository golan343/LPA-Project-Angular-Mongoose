export class Pagination {
    constructor(sliceAmount?: number, length?: number) {
        this.sliceAmount = sliceAmount;
        this.listLength = length;
        this.phase = 1;
        this.start = 0;
        this.end = sliceAmount;
        this.show = sliceAmount <= length;
        this.showLeft = this.phase > 1;
        this.showRight = (this.phase) * this.sliceAmount <= this.listLength;
        if (this.sliceAmount) {
            this.maxPhase = Math.ceil(this.listLength / this.sliceAmount);
        }

    }
    sliceAmount: number;
    listLength: number;
    phase: number;
    maxPhase: number;
    start: number;
    end: number;
    show: boolean;
    showLeft: boolean;
    showRight: boolean;
    next() {

        if (this.phase < this.maxPhase) {
            this.start = this.phase === this.maxPhase ? this.start : this.phase * this.sliceAmount;
            this.phase = this.phase !== this.maxPhase ? this.phase + 1 : this.phase;
            this.end = this.phase == this.maxPhase ? this.listLength : this.phase * this.sliceAmount;

        }
        this.showLeft = this.phase > 1;
        this.showRight = (this.phase) * this.sliceAmount < this.listLength;

    }
    prev() {
        if (this.phase === 1) {
            this.end = this.phase * this.sliceAmount;
            this.start = 0;

        }
        if (this.phase > 1) {
            this.phase--;
            this.end = this.phase * this.sliceAmount;
            this.start = (this.phase - 1) * this.sliceAmount;

        }
        this.showLeft = this.phase > 1;
        this.showRight = (this.phase) * this.sliceAmount <= this.listLength;
    }
}
