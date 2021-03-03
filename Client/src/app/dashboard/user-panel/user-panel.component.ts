import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartPoint } from 'chart.js';
import { AdminService } from '../services/admin.service';
import { ChartJsDataSet, DataSet } from './../model/chartJsDataSet'

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent implements OnInit {
  chartCanvas: Chart;
  usersNameById: any;
  index = 0;
  constructor(private admin: AdminService) { }
  @ViewChild('pieCanvas')
  pieCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieBidsCanvas')
  pieBidsCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieAuctionsCanvas')
  pieAuctionsCanvas: ElementRef<HTMLCanvasElement>;
  option = {
    responsive: true,
    title: {
      display: true,
      position: 'top',
      fontSize: 18,
      fontColor: '#111',
    },
    legend: {
      display: true,
      position: 'bottom',

      labels: {
        fontColor: '#333',
        fontSize: 16,
      },
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 5,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 4,
          label: {
            enabled: false,
            content: 'Test label',
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#fff',
      }
    }
  };
  ngOnInit(): void {
    this.admin.getAllUsers().toPromise().then(
      (res) => {
        const countiesList = {};
        const backgroundColor = [];
        this.usersNameById = {};
        res.forEach((c) => {
          if (!countiesList[c.country]) {
            countiesList[c.country] = 0;
            this.usersNameById[c._id] = c.country;
            backgroundColor.push(this.randoColor());
          }
          countiesList[c.country]++;
        });
        const labels = Object.keys(countiesList) as Array<string>;
        const data = Object.values(countiesList) as
          | Array<number | null | undefined | number[]>
          | ChartPoint[];
        const dataset = [
          {
            data,
            backgroundColor,
          },
        ];
        this.pieCanvas.nativeElement.height = 260;
        const context = this.pieCanvas.nativeElement.getContext('2d');
        this.chartCanvas = new Chart(context, {
          type: 'pie',
          data: {
            datasets: dataset,
            labels: labels,
          },
          options: this.option
        });

      }
    ).then(res => {
      this.admin.getAllUsersBids().subscribe(res => {
        const bidsPerUser = {};
        const backgroundColor = [];
        const chartjsData = new ChartJsDataSet();
        res.forEach(item => {
          let userName = this.usersNameById[item.userId];
          if (userName) {
            if (!bidsPerUser[item.userId]) {
              bidsPerUser[item.userId] = 0;
              chartjsData.labels.push(userName);
              backgroundColor.push(this.randoColor());
            }
            bidsPerUser[item.userId]++;
          }
        });
        chartjsData.datasets = []
        chartjsData.datasets.push(new DataSet(
          Object.values(bidsPerUser),
          backgroundColor
        ));
      
        this.pieBidsCanvas.nativeElement.height = 260;
        const context = this.pieBidsCanvas.nativeElement.getContext('2d');
        console.log(chartjsData);
        this.pieBidsCanvas = new Chart(context, { type: 'pie', data: chartjsData, options: this.option })
      });
      this.admin.getAllAuction().subscribe(res => {
        const backgroundColor = [];
        const chartjsData = new ChartJsDataSet();
        const ClosedOrActive = {
          active: 0,
          closed: 0
        };
        res.forEach(auc => {
          auc.status ? ClosedOrActive.active++ : ClosedOrActive.closed++;
        });
        backgroundColor.push(this.randoColor());
        backgroundColor.push(this.randoColor());
        chartjsData.labels = Object.keys(ClosedOrActive);
        chartjsData.datasets = []
        chartjsData.datasets.push(new DataSet(
          Object.values(ClosedOrActive),
          backgroundColor,
        ));
        this.pieAuctionsCanvas.nativeElement.height = 260;
        const context = this.pieAuctionsCanvas.nativeElement.getContext('2d');
        console.log(chartjsData);
        this.pieAuctionsCanvas = new Chart(context, { type: 'pie', data: chartjsData, options: this.option })
      });
    });
    console.log(this);
  }
  randoColor() {
    const colors = ["#54708C", "#ccc", "#1d65f2", "#000", "#888"]
    if (this.index >= colors.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
    return colors[this.index];
  }
}
