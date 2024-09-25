<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const outputs = ref<string[]>([
  " --start--",
  " 将目标东善桥500kV变电站设为最终节点",
  " 起始入口1设定云端DDos攻击",
  " 起始入口2设定僵尸网络攻击阵地",
  " 测算路径寻找节点场所",
  " 确认南京电力调度中心为途径场所节点",
  " 获取南京电力调度中心关基设施",
  " 获取东善桥500kV变电站关基设施",
  " 分析具体攻击路线",
  " 生成路线1-路线2-路线3",
  " 拼合进攻路径",
  " 生成完整路径1",
  " 生成完整路径2",
  " 生成完整路径3",
  " --end--",
]);

const displayedOutputs = ref<string[]>([]);
const terminalRef = ref<HTMLElement | null>(null);

onMounted(() => {
  let index = 0;
  const interval = setInterval(async () => {
    if (index < outputs.value.length) {
      displayedOutputs.value.push(outputs.value[index]);
      index++;

      // 等待 DOM 更新完成后，自动滚动到底部
      await nextTick();
      if (terminalRef.value) {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
      }
    } else {
      clearInterval(interval);
    }
  }, 1000); // 每行显示间隔为1秒
});
</script>

<template>
  <div class="w-full h-full relative ">
    <div class="noise"></div>
    <div class="overlay"></div>
    <div class="terminal overflow-auto" ref="terminalRef">
      <!-- <h1>--start--</h1> -->
      <p v-for="(output, index) in displayedOutputs" :key="index" class="output">{{ output }}</p>
      <!-- <h1>--end--</h1> -->
    </div>
  </div>
</template>

<style scoped>
.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/images/system/noise.webp");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
}

.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    repeating-linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
}

.overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0% {
    background-position: 0 -100vh;
  }

  35%,
  100% {
    background-position: 0 100vh;
  }
}

.terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  text-transform: uppercase;
  overflow-y: auto;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
    0 0 1px rgba(51, 255, 51, 0.4),
    0 0 2px rgba(255, 255, 255, 0.8);
}

.output::before {
  content: "> ";
}

a {
  color: #fff;
  text-decoration: none;
}

a::before {
  content: "[";
}

a::after {
  content: "]";
}

.errorcode {
  color: white;
}
</style>
