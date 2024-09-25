<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import { Search } from '@element-plus/icons-vue'
import { clearAllAlreadyFeatures, handleRoutePlaningLogic } from '../business'
import RouteTableContent from './RouteTableContent.vue'
import TextAnimatePanel from './TextAnimatePanel.vue'

const store = useAppStore()

/**
 * 点击左侧的显示文字的栏，打开选择面板
 * 选择表格中的行，点击确定，左侧显示文字的栏滚动
 * 打开dialog，显示进度
 * 点击 dialog 的确定，开始规划
 * 点击返回，清空选中的要素，清空文字以及显示状态
 */

// 左侧的滚动文字
const currentLeftText = ref(null)

// 是否显示选择面板
const isShowSelectPanel = ref(false)

// 当前选中的行
const currentRows = ref<any>([])

// 是否显示弹窗
const isShowTextAnimatePanel = ref(false)

const currentSearchText = ref('')

function handleClickToOpenSelectPanel() {
  isShowSelectPanel.value = !isShowSelectPanel.value
}
function handleClick() {
  if (currentRows.value.length > 0) {
    currentLeftText.value = currentRows.value.map((i: any) => {
      return i.rkmc
    })

    isShowTextAnimatePanel.value = true
  } else {
    currentLeftText.value = null
  }
  isShowSelectPanel.value = !isShowSelectPanel.value
}

watch(isShowTextAnimatePanel, (newVal) => {
  if (newVal === false) {
    // 清楚所有的要素，展示全部新的要素
    if (store.appCesiumViewer && store.currentSelectTarget) {
      handleRoutePlaningLogic(store.appCesiumViewer, store.currentSelectTarget)
    }

    // 左右侧面板也是要改变的
    store.appLeftShowIndex = 2
    store.appRightBottomShowIndex = 3
  }
})

function handleReturn() {
  // 先清除地图所有的要素
  if (store.appCesiumViewer && store.currentSelectTarget) {
    clearAllAlreadyFeatures(store.appCesiumViewer)
  }
  // 状态也清空
  store.currentSelectTarget = null
  currentLeftText.value = null

  // 再返回到目标优选
  store.currentAppStatus = '目标优选'
  // 两侧的面板也要还原
  store.appLeftShowIndex = 1
  store.appRightBottomShowIndex = 2
}
</script>

<template>
  <Transition name="slide-down">
    <div v-if="store.currentSelectTarget && store.currentAppStatus === '路径规划'"
      class="fixed top-0 left-0 w-full h-screen pointer-events-none flex flex-row justify-center">
      <div class="wrapper top-[140px] pointer-events-auto flex flex-row items-center justify-center relative">
        <!-- 左侧 -->
        <div class="w-[435px] h-full absolute top-0 left-0 text-[#fefe3f] text-[30px]">
          <!-- 刚开始的页面 -->
          <div class="cursor-pointer w-full h-full flex justify-center items-start relative">
            <!-- <div class="absolute top-0 left-0 w-[60px] h-[60px] " @click="handleClickToOpenSelectPanel"></div> -->
            <span v-if="!currentLeftText" class="w-full h-full flex justify-center items-center"
              @click="handleClickToOpenSelectPanel">请选择入口阵地</span>
            >

            <div v-if="currentLeftText" class="w-[370px] ml-[50px] h-[55px] flex flex-row"
              @click="handleClickToOpenSelectPanel">
              <Vue3Marquee>
                <div v-for="item in currentLeftText" :key="item" class="leading-[80px]">
                  {{ item }}
                </div>
              </Vue3Marquee>
            </div>

            <Transition name="fade">
              <div v-if="isShowSelectPanel"
                class="flex flex-col gap-2 justify-start items-center px-4 pt-4 pb-2 absolute bg-gradient-to-b from-[#00000030] to-[#54a75590] rounded-b-[10px] border border-[#54a755] top-[70px] left-0 w-full h-[330px]">
                <el-input v-model="currentSearchText" clearable style="
                    width: 60%;
                    height: 36px;
                    --el-input-bg-color: transparent;
                    --el-input-border-color: #ffffff20;
                    --el-input-text-color: #ffffff;
                  " placeholder="请输入入口名称">
                  <template #suffix>
                    <svg class="cursor-pointer hover:text-white w-6 h-6 text-[#ffffff60]"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                    </svg>
                  </template>
                </el-input>

                <RouteTableContent v-model="currentRows" :current-search-text="currentSearchText" />

                <div class="w-full flex justify-end items-center">
                  <el-button color="#363e6a" type="primary" size="small" @click="handleClick">确定</el-button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <!-- 中间 -->
        <div class="w-[240px] h-full absolute top-0 left-[800px]" @click="handleReturn">
          <img v-if="!currentLeftText" class="w-[50px] h-[50px] absolute top-[14px] left-[10px]"
            src="/images/system/禁止播放.png" alt="" />
          <img v-else class="w-[50px] h-[50px] absolute top-[14px] left-[10px]" src="/images/system/播放.png" alt="" />
        </div>
        <!-- 右侧 -->
        <div class="w-[435px] h-full absolute top-0 right-0 text-[#fefe3f] text-[30px]">
          <!-- 刚开始的页面 -->
          <div class="cursor-pointer w-full h-full flex justify-center items-start relative" @click="handleReturn">
            <span class="w-full h-full flex justify-center items-center">
              {{ store.currentSelectTarget?.name || '' }}
            </span>
          </div>
        </div>

        <!-- 中间弹窗滚动动画 -->
        <div class="pointer-events-none fixed w-full h-full top-0 left-0 flex justify-center items-center">
          <Transition name="bounce">
            <TextAnimatePanel v-if="isShowTextAnimatePanel" v-model="isShowTextAnimatePanel" />
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.slide-down-enter-active {
  transition-delay: 0.5s;
}

.wrapper {
  width: 1860px;
  gap: 20px;
  height: 80px;
  background-color: #00000090;
  color: white;
  background: url('/images/system/路径规划条.png') no-repeat;
}

.button {
  background: #92d050;
  height: 100%;
  width: 100px;
  border-radius: 50px;
}
</style>
