<template>
  <div ref="chart" class="echartLines"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  BarChart,
  TitleComponent,
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  CanvasRenderer,
]);

export default {
  name: "EchartLines",
  data() {
    return {
      myChart: null,
      option: {
        title: {
          text: "近半年的收入支出情况",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["收入", "支出"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          itemSize: 18,
          itemGap: 18,
          show: true,
          feature: {
            dataView: {
              readOnly: false,
            },
            magicType: {
              type: ["bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2021-1", "2021-2", "2021-3", "2021-4", "2021-5", "2021-6"],
          axisLabel: {
            fontSize: 16,
            margin: 24,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}万",
            fontSize: 16,
            margin: 24,
          },
        },
        series: [
          {
            name: "收入",
            type: "line",
            data: [0, 132, 101, 134, 90, 230, 210],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "支出",
            type: "line",
            data: [0, 100, 191, 234, 290, 330, 310],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "Max",
                },
                {
                  type: "min",
                  name: "Min",
                },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.createEChart();
  },
  methods: {
    createEChart() {
      const echartDom = this.$refs.chart;
      this.myChart = echarts.init(echartDom);
      this.myChart.setOption(this.option);
    },
    repaint() {
      this.option.series[0].data[0] = 500;
      this.myChart.setOption(this.option, true);
    },
  },
};
</script>