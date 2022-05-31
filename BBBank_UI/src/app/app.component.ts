import {Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {Chart, LinearScale, CategoryScale, registerables,} from 'chart.js';
import { lineGraphData } from './models/line-graph-data';
import { TransactionService } from './services/transaction.service';

Chart.register(LinearScale, CategoryScale);
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('chartBig1') myCanvas: ElementRef;

  lineGraphData: lineGraphData;

  gradientChartOptionsConfigurationWithTooltipRed: any;

  public myChartData: any;

  public context: CanvasRenderingContext2D;

  constructor(private transactionService: TransactionService) {
    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
      responsive: true,
      scales: {
        yAxes:
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: '#9a9a9a',
            },
          },

        xAxes:
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: '#9a9a9a',
            },
          },
      },
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = (this.myCanvas
      .nativeElement as HTMLCanvasElement).getContext('2d');
    this.transactionService
      .GetLast12MonthBalances('aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3')
      .subscribe({
        next: (data: lineGraphData) => {
          this.lineGraphData = data;

          const gradientStroke = this.context.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
          gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
          gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); // red colors

          this.myChartData = new Chart(this.context, {
            type: 'line',
            data: {
              labels: this.lineGraphData?.labels,
              datasets: [
                {
                  label: 'Last 12 Month Balances',
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: '#ec250d',
                  borderWidth: 2,
                  borderDashOffset: 0.0,
                  pointBackgroundColor: '#ec250d',
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: '#ec250d',
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: this.lineGraphData?.figures,
                },
              ],
            },
            options: this.gradientChartOptionsConfigurationWithTooltipRed,
          });
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
