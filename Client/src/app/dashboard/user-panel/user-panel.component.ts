import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartPoint } from 'chart.js';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  chartCanvas: Chart;

  constructor(private admin: AdminService) { }
  @ViewChild("pieCanvas")
  pieCanvas: ElementRef<HTMLCanvasElement>;
  ngOnInit(): void {
    this.admin.getAllUsers().subscribe(res => {
      const countiesList = {};
      const backgroundColor = [];
      res.forEach(c => {
        if (!countiesList[c.country]) {
          countiesList[c.country] = 0;
          backgroundColor.push(this.randoColor());
        }
        countiesList[c.country]++;
      });
      const labels = Object.keys(countiesList) as Array<string>;
      const data = Object.values(countiesList) as Array<number | null | undefined | number[]> | ChartPoint[];;
      const dataset = [{
        data,
        backgroundColor
      }];
      this.pieCanvas.nativeElement.height = 260;
      const context = this.pieCanvas.nativeElement.getContext('2d');
      this.chartCanvas = new Chart(context, {
        type: "pie",
        data: {
          datasets: dataset,
          labels: labels,

        },
        options: {
          responsive: true
        }
      });
      this.chartCanvas.generateLegend();
    }, err => {
      console.log(err);
    })

  }
  randoColor() {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    return `rgba(${red},${blue},${green},1)`;
  }

}
