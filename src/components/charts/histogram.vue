<template>
  <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>
<script>
import store from "../../store.js";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import histogram from "highcharts/modules/histogram-bellcurve";
exportingInit(Highcharts);
histogram(Highcharts);

export default {
  name: "charts",
  store,
  stat: [],
  props: ["title", "playTime", "playerCount"],
  data() {
    return {
      chartOptions: {
        title: {
          text: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+this.title,

        },

        xAxis: [
          { title: { text: "n = " + this.playerCount }, opposite: true },
          {
            title: { text: "Playtime(mins)" },
            alignTicks: false,
          },
        ],

        yAxis: [
          {
            title: { text: "Instance" },
            alignTicks: false,
          },
          {
            title: { text: "" },
            alignTicks: false,
          },
        ],

        series: [
          {
            name: "Histogram",
            showInLegend: false,
            type: "histogram",
            xAxis: 1,
            yAxis: 1,
            baseSeries: 1,
          },
          {
            visible: true,
            showInLegend: false,
            data: JSON.parse(this.playTime),
          },
        ],
      },
    };
  },
};
</script>
