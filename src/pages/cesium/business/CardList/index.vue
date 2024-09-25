<script setup lang="ts">
import TableContent from './TableContent.vue'

const searchValue = ref('')

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Top5',
  },
]

const data = ref([
  {
    name: '发电厂',
    count: 2,
  },
  {
    name: '配电站',
    count: 2,
  },
  {
    name: '调度中心',
    count: 2,
  },
])
</script>

<template>
  <div class="wrapper w-full h-[496px] mt-[20px] pt-[26px] px-[28px] overflow-auto text-white relative">
    <!-- 标题 -->
    <div class="w-full h-[20px] flex justify-start items-center mb-[20px] ">
      <div class="title">
        重点目标
      </div>
    </div>

    <!-- 第二行 -->
    <div class="flex flex-row justify-center items-end">
      <div class="w-[180px] h-[52px] flex flex-row justify-center items-center gap-4">
        <div class="text-8 font-bold mt-[10px] text-[20px]">重点目标</div>

        <el-select v-model="value" placeholder="Top5" style="
                  width: 80px;
                  height: 24px;
                  --el-fill-color-blank: #293a56;
                  --el-border-color: #ffffff;
                  --el-text-color-placeholder: #ffffff;
                ">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>

    <!-- 第三行 -->
    <div class="w-full h-[64px]  gap-[100px] flex flex-row justify-center items-center">
      <div class="flex flex-row justify-center items-center gap-2">
        <img class="w-[40px] h-[40px] object-contain" src="/images/system/发电厂.png" alt="">
        <span class="text-[20px]">{{ data[0].count }} 个</span>
      </div>
      <div class="flex flex-row justify-center items-center gap-2">
        <img class="w-[40px] h-[40px] object-contain" src="/images/system/变电站.png" alt="">
        <span class="text-[20px]">{{ data[1].count }} 个</span>
      </div>
      <div class="flex flex-row justify-center items-center gap-2">
        <img class="w-[40px] h-[40px] object-contain" src="/images/system/调度中心.png" alt="">
        <span class="text-[20px]">{{ data[2].count }} 个</span>
      </div>
    </div>
    <div>
      <TableContent :search-value="searchValue" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-image: url('/images/system/bgBlock.png');
  background-size: 700px 500px;
  background-repeat: no-repeat;
  background-position: left top;
}

.title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  margin-left: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title::before {
  position: absolute;
  content: "";
  width: 14px;
  height: 12px;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url("/images/system/jt.png");
}
</style>
