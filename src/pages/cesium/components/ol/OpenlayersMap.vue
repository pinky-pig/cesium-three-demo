<script setup lang="ts">
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const props = withDefaults(
  defineProps<{
    mapKey?: string
    options?: any
  }>(),
  {
    mapKey: 'default',
    options: () => ({}),
  },
)

const emit = defineEmits(['onload'])

const mapContainer = ref<HTMLElement | null>(null)
let viewer: Map | null

onMounted(() => {
  initOLMap(props.options)
})

onUnmounted(() => {
  if (viewer) {
    // viewer.destroy()
    viewer = null
  }
})

function initOLMap(option: any) {
  if (mapContainer.value) {
    viewer = new Map({
      target: mapContainer.value,
      layers: [
        new TileLayer({
          source: new OSM(),
          wrapX: false  // 关闭水平方向瓦片的重复显示
        }),
      ],
      ...option,
      view: new View({
        center: [104.1954, 35.8617],
        projection: 'EPSG:4326',
        zoom: 2,
      }),
    });
    emit('onload', viewer)
  }
}
</script>

<template>
  <div ref="mapContainer" class="h-full w-full ol-map" />
</template>

<style>
@import "./ol.css";
</style>
