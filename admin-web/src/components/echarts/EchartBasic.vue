<template>
  <div>
    <div ref="chart" class="echartBasic"></div>
  </div>
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
  name: "EchartBasic",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    itemColor: {
      type: String,
      default: "#01C5AA",
    },
    type: {
      type: String,
      default: "line",
    },
  },
  data() {
    let months = [];
    let values = [];
    let magicType = [];
    this.data.forEach((item) => {
      months.push(item.month);
      values.push(item.value);
    });

    if (this.type === "line") magicType.push("bar");
    else magicType.push("line");

    return {
      myChart: [],
      option: {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
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
              type: magicType,
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: months,
          axisLabel: {
            fontSize: 16,
            margin: 24,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 16,
            margin: 24,
          },
        },
        series: [
          {
            data: values,
            type: this.type,
            itemStyle: {
              color: this.itemColor,
            },
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
              data: [
                {
                  type: "average",
                  name: "Avg",
                },
              ],
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      //ref如果在普通元素DOM元素上使用，引用就指向组件实例
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