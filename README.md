# Data Visualization in Angular using ChartJS

## What is ChartJs?
[Chart.Js](https://www.chartjs.org/ "Chart.Js") is a  community maintained open-source JavaScript library, and It is used to represent the data using the HTML5 canvas.

It allows us to build dynamic as well as static charts, and it comes with full animation support supports 8 different chart types (including bars, lines, & pies).

The charts are animated and responsive so we can show it on any device.
It takes data in the JSON form, so it is merely simple to use it with any programming language. 

## About this exercise
In this lab we will be working on two code Bases, the **Backend Code Base** and the **Frontend Code Base**

#### **Backend Code Base:**
Previously we developed a base structure of an API Solution in ASP.NET Core that have just two api functions GetLast12MonthBalances & GetLast12MonthBalances/{userId} which returns data of the last 12 months total balances.

There are 4 Projects in the solution.

1. **Entities:** This project contains DB models like User where each User has one Account and each Account can have one or many Transactions. There is also a Response Model of LineGraphData that will be returned as API Response.

3. **Infrastructure:** This project contains BBBankContext that service as fake DBContext that populates one User with its corresponding Account that has three Transactions dated of last three months with hardcoded data.

5. **Services:** This project contains TransactionService with the logic of converting Transactions into LineGraphData after fetching them from BBBankContext.

7. **BBBankAPI:** This project contains TransactionController with GET methods GetLast12MonthBalances & GetLast12MonthBalances/{userId} to call the TransactionService.

For more details about this Backend base project visit:
https://github.com/PatternsTechGit/PT_ServiceOrientedArchitecture

#### **Frontend Code Base:**
Previously we scaffolded a new Angular application in which we have integrated

- FontAwesome
- Bootstrap Toolbar
- Angular Material SideNav


#### About this exercise
In this exercise we will
- Configure Chart Js in Angular App
- Allow Cross Origin Request Sharing in API
- Add Chart JS

------------

#### Step 1: Configure Chart Js in Angular app
To install the latest chart.js package. running the following command

```typescript
npm install chart.js --save
```
This given command will save the entry inside the `package.json` file.
 
#### Step 2: - Allow Cross Origin Request Sharing in API
Before adding Chart JS in the Angular App, we'll have to give permission to Angular App to access API endpoints.

Now we will reconfigure the API's code to solve this issue:

- Open Program.cs file

```csharp
// Creating a local variable
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Adding policy called MyAllowSpecificOrigins
// Allowing all the requests from http://localhost:4200

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                                                .AllowAnyMethod();
                    });
});

// Configuring the HTTP request pipeline by using

app.UseCors(MyAllowSpecificOrigins);
```
This will successfully allow the Angular App to access the API

#### Step 3: - Add Chart JS
Let's represent the Data for 12 months via Chart Js in Angular app on the Dashboard Component.

Go to `dashboard.components.html` file and add the following code in it.

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
              <!-- The HTML <canvas> element creates a fixed-size drawing surface that exposes one or more rendering contexts, which are used to create and manipulate the content shown. -->
              <canvas #chartBig1> </canvas>
            </div>
        </div>
      </div>
    </div>
  </div>
```


Go to `dashboard.components.css` file and add the following code in it.
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










