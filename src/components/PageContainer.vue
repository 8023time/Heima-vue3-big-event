<!-- 频道管理 -->
<script setup>
defineProps({
    title: {
        required: true, 
        type: String 
    }
})
</script>
<!-- 在components组件中,会帮我们自动注册组件,可以直接用 -->
<template>
  <el-card class="page-container">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
