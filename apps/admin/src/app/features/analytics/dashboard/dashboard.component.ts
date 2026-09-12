import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  mockItem = {
    id: 1,
    name: 'John Doe',
    pinCode: 890102,
    value: 1000,
    recieved: new Date(),
  };
  mock = new Array(10).fill(this.mockItem);

  timefilter = new FormControl('last 7 days');

  ngOnInit(): void {
    this.renderBarChart();
    this.renderLineChart();
  }

  renderBarChart() {
    const option = {
      // title: {
      //   text: 'ECharts Getting Started Example',
      // },
      tooltip: {},
      // legend: {
      //   data: ['orders'],
      // },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          name: 'orders',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 30],
        },
      ],
    };
    const myChart = echarts.init(document.getElementById('bar-chart'));
    myChart.setOption(option);
  }

  renderLineChart() {
    const lineChartOptions = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [...Array(7).keys()].map((x) => x++),
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          name: 'July',
          type: 'line',
          stack: 'Total',
          data: [...Array(7).keys()].map((x) =>
            Math.floor(Math.random() * 600)
          ),
        },
        {
          name: 'August',
          type: 'line',
          stack: 'Total',
          data: [...Array(7).keys()].map((x) =>
            Math.floor(Math.random() * 600)
          ),
        },
      ],
    };
    const lineChart = echarts.init(document.getElementById('line-chart'));
    lineChart.setOption(lineChartOptions);
  }
}
