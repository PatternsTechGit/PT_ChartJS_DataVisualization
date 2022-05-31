# Data Visualization in Angular using ChartJS

## What is ChartJs?
[Chart.Js](https://www.chartjs.org/ "Chart.Js") is a  community maintained open-source JavaScript library, and It is used to represent the data using the HTML5 canvas.

It allows us to build dynamic as well as static charts, and it comes with full animation support supports 8 different chart types (including bars, lines, & pies).

The charts are animated and responsive so we can show it on any device.
It takes data in the JSON form, so it is merely simple to use it with any programming language. 

## About this exercise
In this lab we will be working on two code Bases, the **Backend Code Base** and the **Frontend Code Base**

### **Backend Code Base:**
Previously we developed a base structure of an API Solution in ASP.NET Core that have just two api functions GetLast12MonthBalances & GetLast12MonthBalances/{userId} which returns data of the last 12 months total balances.

There are 4 Projects in the solution.

1. **Entities:** This project contains DB models like User where each User has one Account and each Account can have one or many Transactions. There is also a Response Model of LineGraphData that will be returned as API Response.

3. **Infrastructure:** This project contains BBBankContext that service as fake DBContext that populates one User with its corresponding Account that has three Transactions dated of last three months with hardcoded data.

5. **Services:** This project contains TransactionService with the logic of converting Transactions into LineGraphData after fetching them from BBBankContext.

7. **BBBankAPI:** This project contains TransactionController with GET methods GetLast12MonthBalances & GetLast12MonthBalances/{userId} to call the TransactionService.

![](/images/12m.jpg)

For more details about this Backend base project visit:
https://github.com/PatternsTechGit/PT_ServiceOrientedArchitecture

-----------------

### **Frontend Code Base:**
Previously we scaffolded a new Angular application in which we have integrated

- FontAwesome
- Bootstrap Toolbar
- Angular Material SideNav
- Data received from API

-----------

### **About this exercise**
In this exercise we will
- Integrate chart JS in Angular
- Creating and Giving Styling to the Card
- Adding and Styling data in form of graph


***Note: Clone *Before* folder to start this lab**

------------

### Step 1: Configure Chart Js in Angular
To configure, install the latest *chart.js* package run the following command in the terminal

```typescript
npm install chart.js --save
```
This given command will save the entry inside the `package.json` file.

Now paste the below given code in *index.html* file. This way our app will know the path of installed chart.js  
```html
<script src="node_modules/chart.js/src/chart.js"></script>
```
----------------
 
#### Step 2:  Adding Card in UI
We will construct a card like structure on which we will display data.
To construct the card we will create an HTML code.

For HTML go to `app.components.html` file and paste the following code in it.

```html
<div class="row">
    <div class="col-12">
        <!-- The CSS will give the chart a card like structure -->
      <div class="card card-chart">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-6 text-left">
               <h5 class="card-category">Current Balance</h5> 
              <h2 class="card-title">$ {{lineGraphData?.totalBalance}}</h2>
            </div>
          </div>
        </div>
        <div style="display: block">
          <div class="chart-area">
              <!-- Here <canvas> is an HTML element which is used to draw graphics via scripting -->
              <canvas #chartBig1> </canvas>
            </div>
        </div>
      </div>
    </div>
  </div>
```

### Step 3: Styling Card for data visualization

For this we will make new file named *'graph.css'* for the styling of our graph. Paste the below given css code in it
```css
/* Graph CSS */

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #ffffff;
    background-clip: border-box;
    border: 0.0625rem solid rgba(34, 42, 66, 0.05);
    border-radius: 0.2857rem;
  }
  .category,
  .card-category {
    text-transform: capitalize;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
  }
  
  .card-category {
    font-size: 0.75rem;
  }
  .card {
    background: #27293d;
    border: 0;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
  }
  
  .card label {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .card .card-title {
    margin-bottom: .75rem;
  }
  
  .card .card-body {
    padding: 15px;
  }
  
  .card .card-body.table-full-width {
    padding-left: 0;
    padding-right: 0;
  }
  
  .card .card-body .card-title {
    color: #ffffff;
    text-transform: inherit;
    font-weight: 300;
    margin-bottom: .75rem;
  }
  
  .card .card-body .card-description,
  .card .card-body .card-category {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .card .card-header {
    padding: 15px 15px 0;
    border: 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .card .card-header:not([data-background-color]) {
    background-color: transparent;
  }
  
  .card .card-header .card-title {
    color: #ffffff;
    font-weight: 100;
  }
  
  .card .card-header .card-category {
    color: #9A9A9A;
    margin-bottom: 5px;
    font-weight: 300;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  @media (max-width: 767.98px) {
    .card.card-chart .card-header .btn-group-toggle .tim-icons {
      font-size: .875rem;
      top: -1px;
    }
  }
  
  .card-chart {
    overflow: hidden;
  }
  
  .card-chart .card-header .card-title i {
    font-size: 16px;
    margin-right: 5px;
    margin-bottom: 3px;
  }
  
  .card-chart .card-header .card-category {
    margin-bottom: 5px;
  }
  
  .card-chart .card-body {
    padding-left: 5px;
    padding-right: 5px;
  }
  
  .card-chart .card-body .tab-space {
    padding: 0;
  }
  
  .card-chart .table {
    margin-bottom: 0;
  }
  
  .card-chart .table td {
    border-top: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .card-chart .card-progress {
    margin-top: 30px;
    padding: 0 10px;
  }
  
  .card-chart .chart-area {
    height: 220px;
    width: 100%;
  }
  
  .card-chart .card-footer {
    margin-top: 15px;
  }
  
  .card-chart .card-footer .stats {
    color: #9A9A9A;
  }
  
  .card-chart .dropdown {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  
  .card-chart .dropdown .btn {
    margin: 0;
  }
  
  .card-chart.card-chart-pie .chart-area {
    padding: 10px 0 25px;
    height: auto;
  }
  
  .card-chart.card-chart-pie .card-title {
    margin-bottom: 10px;
  }
  
  .card-chart.card-chart-pie .card-title i {
    font-size: 1rem;
  }
```

- Now we have to import this css file in main *app.component.css* by this code
```css
@import './graph.css';
```
----------

### Step 5: Adding and Styling CartJS Data on the Card

- For this we will paste below given code in *app.component.ts* file.
- For detailed information on functionality of each line please read the comments given on each line/chunk of code.

```typescript
import {Component, ElementRef, OnInit, ViewChild,} from '@angular/core'; 

// Import chartJS dependencies as per given in ChartJS documentation
import {Chart, LinearScale, CategoryScale, registerables,} from 'chart.js';

import { lineGraphData } from './models/line-graph-data';
import { TransactionService } from './services/transaction.service';

// Register the imported plugins 
// Since we are using Linear graph in our UI. We will register LinearScale
Chart.register(LinearScale, CategoryScale);
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // here chartBig1 is Canvas element we will use in our HTML
  @ViewChild('chartBig1') myCanvas: ElementRef;

  lineGraphData: lineGraphData;
  
  // Object to ToolTip
  gradientChartOptionsConfigurationWithTooltipRed: any;

  public myChartData: any;

  public context: any;

  constructor(private transactionService: TransactionService) {
    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      // Tooltips can be attached to any active element (icons, text links, buttons, etc.) on a page. They provide descriptions or explanations for their paired element.
      // here we are styling our Tooltip
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

      // Styling Y axis of our ToolTip
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
        // Styling x-axis of our tooltip
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
    //The getContext() function returns the drawing context - which is an object that has all the drawing properties and functions you use to draw on the canvas. The getContext() function is the function that you use to get access to the canvas tags 2D drawing functions.
    this.context = (this.myCanvas
      .nativeElement as HTMLCanvasElement).getContext('2d');
    this.transactionService
        //getting 12 months balance for below given id number from our API   
      .GetLast12MonthBalances('aa45e3c9-261d-41fe-a1b0-5b4dcf79cfd3')
      .subscribe({
        next: (data: lineGraphData) => {
          this.lineGraphData = data;
          // adding gradient under the lines in the graph
          const gradientStroke = this.context.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
          gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
          gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); // red colors

          //Properties of the chart
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
                  //it fills color for points.
                  pointBackgroundColor: '#ec250d',
                  // It fills border color for points.
                  pointBorderColor: 'rgba(255,255,255,0)',
                  //
                  pointHoverBackgroundColor: '#ec250d',
                  //The width of the point border in pixels.
                  pointBorderWidth: 20,
                  // The radius of the point when hovered.
                  pointHoverRadius: 4,
                  //Border width of point when hovered.
                  pointHoverBorderWidth: 15,
                  //The radius of the point shape. If set to 0, the point is not rendered.
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

```
----------------

### FINAL OUTPUT 

Our final output will show all the data returned from our API in chart form.

![](/images/1.jpg)










