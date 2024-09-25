<script setup lang="ts">
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = './arcgisAssets'

const props = withDefaults(
  defineProps<{
    options?: any
  }>(),
  {
    options: () => ({
      center: [118.888175, 32.048268],
    }),
  },
)

const emit = defineEmits(['onload'])

let map: mapboxgl.Map | null
const mapContainer = ref(null)


onMounted(() => {
  setTimeout(() => {
    initMap(props.options)
  })
})
onUnmounted(() => {
  map?.remove()
})
function initMap(option: any) {

  // const tiledLayer = new WebTileLayer({
  //   urlTemplate: "https://{subDomain}.tile.opentopomap.org/{z}/{x}/{y}.png",
  //   subDomains: ["a", "b", "c"],
  // });

  const tiledLayer = new WebTileLayer({
    // urlTemplate: "http://localhost:8082/china/{z}/{x}/{y}.png",
    urlTemplate: "https://t3.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileCol={x}&TileRow={y}&TileMatrix={z}&tk=0a70a4972c96471a42fb421835029e73",
  });
  const tiledLayerLabel = new WebTileLayer({
    urlTemplate: "https://t4.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileCol={x}&TileRow={y}&TileMatrix={z}&tk=0a70a4972c96471a42fb421835029e73",
  });
  const tiledLayerGd = new WebTileLayer({
    urlTemplate: "http://wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
  });

  // 生成 3D 地图
  const map = new Map({
    basemap: "topo-vector",
    layers: [
      tiledLayer,
      tiledLayerLabel,
      tiledLayerGd
    ]
  });
  const view = new SceneView({
    container: mapContainer.value!,
    map: map,
    spatialReference: {
      wkid: 3857
    },
  });

  // 生成 2D 地图
  // const view = new MapView({
  //   container: mapContainer.value!,
  //   map: map,
  //   zoom: 4,
  //   ...props.options
  // });

  emit('onload', {
    view: view,
    map: map
  })
}
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%" />
</template>

<style>
@import "./main.css";
</style>
