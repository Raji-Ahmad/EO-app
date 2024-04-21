import {Component, computed, effect, Input, Signal, signal, ViewChild} from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill, ApexTheme, NgApexchartsModule, ApexLegend
} from "ng-apexcharts";
import {BreaksService} from "../breaks.service";
import {Ihistogram} from "../services/eo-service.service";
import {ChartData} from "chart.js";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: string[]
  legend: ApexLegend
};

@Component({
  selector: 'app-hist',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './hist.component.html',
  styleUrl: './hist.component.scss'
})
export class HistComponent {
  protected isHandset: boolean = false;
  fontSize = '12px'
  @Input({required: true}) title: string = ''
  @Input() data = signal<Ihistogram | null>(null)
  @Input({required: true}) colors: string[] = []
  @Input() disableLabels: boolean = false
  @Input() disableLegend: boolean = false
  @ViewChild("chart") chart: ChartComponent | undefined;

  // public chartOptions: ChartOptions // Partial<ChartOptions>;
  theme: ApexTheme = {
    mode: 'dark',
    // palette: 'palette4',
    // monochrome: {
    //   enabled: false,
    //   color: '#2c47b4',
    //   shadeTo: 'light',
    //   shadeIntensity: 0.65
    // },
  }

  chartOptions: Signal<ChartOptions> = computed(() => {
    return {
      legend: {
        position: 'bottom',
        show: !this.disableLegend,
        onItemHover: {
          highlightDataSeries: true
        },
      },

      series: [
        {
          name: "Percentage",
          data: []
        }
      ],
      chart: {
        height: 200,
        type: "bar"
      },
      plotOptions: {
        bar: {
          distributed: true,

          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: this.fontSize,
          colors: ["#ccd5dc"]
        }
      },

      colors: this.colors,

      xaxis: {
        categories: [],
        position: "bottom",
        labels: {
          show: !this.disableLabels,
          style: {
            fontSize: this.fontSize
          },
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#9653d7",
              colorTo: "#40097e",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          // stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Stats Histogram",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  })

  e = effect(() => {
    console.log('this.disableLabels')
    console.log(this.disableLabels)

    const origData: Ihistogram = this.data()!
    if (origData) {
      console.log('effecting')


      let bins = origData.bins.map((val) => parseFloat(val.toFixed(2)))
      this.chartOptions().series = [{
        data: bins,
        name: 'Percentage',
      }];

      let labels: string[] = [];
      if (origData.labels) {
        labels = origData.labels
      } else {
        var parsedLabels: string[] = []
        origData.means.forEach((val) => parsedLabels.push(val.toFixed(2).toString()))
        labels = parsedLabels
      }

      this.chartOptions().xaxis = {
        categories: labels,
        position: "bottom",
        labels: {
          show: !this.disableLabels,
          style: {
            fontSize: this.fontSize
          },
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#9653d7",
              colorTo: "#40097e",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      }

    }


  });

  constructor(private bs: BreaksService) {

    console.log(this.colors)
    this.bs.isHandset$.subscribe(result => {
      // console.log(result);
      this.isHandset = result;
      if (result) {
        this.fontSize = '6px'
      }
    })


    // this.chartOptions = {
    //
    //   series: [
    //     {
    //       name: "Inflation",
    //       data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    //     }
    //   ],
    //   chart: {
    //     height: 200,
    //     type: "bar"
    //   },
    //   plotOptions: {
    //     bar: {
    //       dataLabels: {
    //         position: "top" // top, center, bottom
    //       }
    //     }
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: function (val) {
    //       return val + "%";
    //     },
    //     offsetY: -20,
    //     style: {
    //       fontSize: this.fontSize,
    //       colors: ["#ccd5dc"]
    //     }
    //   },
    //
    //   xaxis: {
    //     categories: [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "Nov",
    //       "Dec"
    //     ],
    //     position: "bottom",
    //     labels: {
    //       style: {
    //         fontSize: this.fontSize
    //       },
    //       offsetY: 0
    //     },
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: "gradient",
    //         gradient: {
    //           colorFrom: "#9653d7",
    //           colorTo: "#40097e",
    //           stops: [0, 100],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5
    //         }
    //       }
    //     },
    //     tooltip: {
    //       enabled: true,
    //       offsetY: -35
    //     }
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "light",
    //       type: "horizontal",
    //       shadeIntensity: 0.25,
    //       gradientToColors: undefined,
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       // stops: [50, 0, 100, 100]
    //     }
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false
    //     },
    //     labels: {
    //       show: false,
    //       formatter: function (val) {
    //         return val + "%";
    //       }
    //     }
    //   },
    //   title: {
    //     text: "Monthly Inflation in Argentina, 2002",
    //     floating: false,
    //     offsetY: 320,
    //     align: "center",
    //     style: {
    //       color: "#444"
    //     }
    //   }
    // };
  }

  ngOninit() {
    console.log('this.disableLabels')
    console.log(this.disableLabels)


  }
}
