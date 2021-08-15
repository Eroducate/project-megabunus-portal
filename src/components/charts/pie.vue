<template>
  <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>
<script>
import store from "../../store.js";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
exportingInit(Highcharts);
var data = [];
export default {
  name: "pie",
  store,
  stat: [],
  props: ["id", "index", "names"],
  data() {
    return {
      choiceTable: [],
      length: 0,
      chartOptions: {
        title: {
          text: "",
        },

        series: [
          {
            name: "Pie",
            colorByPoint: true,
            showInLegend: false,
            type: "pie",
            baseSeries: 1,
            data: data,
          },
        ],
      },
    };
  },
  beforeMount() {
    
    this.loadChoiceTable();
  },
  beforeCreate() {
   data = []
  },

  methods: {
    loadChoiceTable() {
      this.$store.store.dispatch("getChoiceTable", this.id).then(() => {
        setTimeout(() => {
          this.choiceTable = this.$store.store.state.choiceTable;
          this.length = this.choiceTable[this.index].length;
          this.constructData();
        }, 400);
      });
    },
    constructData() {
      const total = this.choiceTable[this.index].reduce((pv, cv) => pv + cv, 0);

      for (let i = 0; i < this.choiceTable[this.index].length; i++) {
        data.push(
          JSON.parse(
            JSON.stringify({
              name: this.names[i].localization.cn,
              y: this.choiceTable[this.index][i] / total,
            })
          )
        );
      }
    },
  },
};
</script>
