import {Component, computed, effect, Input, Signal, signal, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions, CartesianScaleOptions} from 'chart.js';
import {Ihistogram} from "../services/eo-service.service";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild(BaseChartDirective, {static: true}) chart!: BaseChartDirective;
  @Input({required:true}) title:string = ''
  @Input() data = signal<Ihistogram | null>(null)
  options: ChartOptions = {}

  chartData: Signal<ChartData<'bar', { mean: string, value: number } []>> = computed(() => {
    return {
      datasets: [{
        data: [],
        parsing: {
          xAxisKey: 'mean',
          yAxisKey: 'value'
        }
      }],
    };
  })

  e = effect(() => {

    let parsedData: { mean: string; value: number }[] = []
    const origData = this.data()!
    if (origData) {
      console.log(origData)
      for (let i = 0; i < origData['means'].length; i++) {
        const mean = origData['means'][i];
        const bin = origData['bins'][i];

        // Generate a dataset for each class
        parsedData.push({
          mean: mean.toFixed(2).toString(), // Count of occurrences
          value: bin // Class label
        });
      }

      console.log('effecting')
      console.log(parsedData)

      this.chartData().datasets = [{
        data: parsedData, parsing: {
          xAxisKey: 'mean',
          yAxisKey: 'value'
        }
      }]
      this.chart.update();
    }


  });

  ngOnInit(){
    this.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: `% of ${this.title} values`
        },
      },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90
        }
      }

    }
  }
  }



  datasets: ChartData<'bar', { mean: string, value: number } []> = {
    datasets: [{
      data: [{mean: 'Sales', value: 20}, {mean: 'Revenue', value: 10}, {
        mean: 'mmRevenue',
        value: 5
      }, {mean: 'fvdRevenue', value: 16}],
      parsing: {
        xAxisKey: 'mean',
        yAxisKey: 'value'
      }
    }],
  };

}
