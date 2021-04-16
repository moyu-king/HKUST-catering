<template>
  <div ref="chart" class="echartPie"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  PieChart,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

export default {
  name: "EchartPie",
  props: {
    legend: {
      type: Object,
      default: () => {
        return {
          orient: "vertical",
          left: "left",
          itemWidth: 48,
          itemHeight: 24,
          textStyle: { fontSize: 14 },
        };
      },
    },
    subtext: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    showToolBox: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    let legend = (() => {
      if (this.showLegend) return this.legend;
      else return null;
    })();

    let toolbox = (() => {
      if (this.showToolBox)
        return {
          itemSize: 18,
          itemGap: 18,
          show: true,
          feature: {
            dataView: {
              readOnly: false,
            },
            saveAsImage: {},
          },
        };
      else return {};
    })();

    return {
      myChart: null,
      option: {
        title: {
          text: this.title,
          subtext: this.subtext,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: legend,
        toolbox: toolbox,
        series: [
          {
            type: "pie",
            radius: "50%",
            data: this.data,
            minAngle: 5,
            label: {
              fontSize: 16,
              formatter: "{b}：{d}%",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
      this.myChart.setOption(this.option, true);
    },
  },
};
</script>