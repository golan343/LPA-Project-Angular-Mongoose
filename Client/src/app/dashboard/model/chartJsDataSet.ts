
export class ChartJsDataSet {
    constructor() {

        this.datasets = [];
        this.labels = [];

    }
    datasets: DataSet[];
    labels: Array<string>;
}
export class DataSet {
    constructor(data?: Array<number | null | undefined | number[]>, backgroundColor?: Array<string>) {
        this.data = data || [];
        this.backgroundColor = backgroundColor || [];
    }
    data: Array<number | null | undefined | number[]>;
    backgroundColor: Array<string>;

}