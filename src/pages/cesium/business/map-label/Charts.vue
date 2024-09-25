<script lang="ts" setup>
import { use } from 'echarts/core'
import { LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

const props = defineProps<{
  data: Array<number>
}>()

use([
  PieChart,
  RadarChart,
  PolarComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
])

const option = ref({
  title: {
    text: '雷达图',
  },
  legend: {
    data: ['Allocated Budget'],
  },
  radar: {
    shape: 'circle',
    indicator: [
      { name: '攻击能力', max: 10 },
      { name: '防御稳固能力', max: 10 },
      { name: '情报收集能力', max: 10 },
      { name: '通信可靠性', max: 10 },
      { name: '威胁感知能力', max: 10 },
      { name: '响应能力', max: 10 },
    ],
    axisNameGap: 4, // 指示器名称和指示器轴的距离
    name: {
      show: true,
      fontSize: 10,
      // color: '#000000',
    },
  },
  series: [
    {
      name: '1',
      type: 'radar',
      data: [
        {
          value: props.data,
          itemStyle: {
            color: '#ff000000',
            borderColor: '#ff000000',
          },
        },
      ],
      areaStyle: {
        color: '#00000090',
      },
      lineStyle: {
        color: '#ff0000',
        width: 1,
      },
    },
  ],
})
</script>

<template>
  <v-chart class="w-full h-full" :option="option" autoresize />
</template>
