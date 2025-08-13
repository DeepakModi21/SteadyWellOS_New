import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//  import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-pie-chart',
  imports: [  CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
//  single: any[] = [
//   {
//     "name": "Germany",
//     "value": 8940000
//   },
//   {
//     "name": "USA",
//     "value": 5000000
//   },
//   {
//     "name": "France",
//     "value": 7200000
//   },
//     {
//     "name": "UK",
//     "value": 6200000
//   }
//  ];
//   view: [number, number] = [700, 400];

//   gradient: boolean = true;
//   showLegend: boolean = true;
//   showLabels: boolean = true;
//   isDoughnut: boolean = false;

// colorScheme: any = {
//   name: 'custom',
//   selectable: true,
//   group: 'ordinal',
//   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
// };

//   constructor() {
//     Object.assign(this, { single: this.single });
//   }

//   onSelect(data :any): void {
//     console.log('Item clicked', JSON.parse(JSON.stringify(data)));
//   }

//   onActivate(data :any ): void {
//     console.log('Activate', JSON.parse(JSON.stringify(data)));
//   }

//   onDeactivate(data :any): void {
//     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
//   }

//   tooltipText({ data }: { data: any }): string {
//   return `${data.name}: ${data.value.toLocaleString()} units`;
// }

pieChartLabels: string[] = ['Red', 'Blue', 'Yellow'];
  pieChartColors: string[] = ['#FF6384', '#36A2EB', '#FFCE56'];

  pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: this.pieChartColors
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };
}
