<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <div class="flex-1-hidden flex-col-stretch gap-16px overflow-hidden">
      <NCard title="学生信息列表" :bordered="false" size="small" class="sm:flex-1-hidden">
        <template #header-extra>
          <NButton type="primary" @click="handleRefresh">
            <template #icon>
              <icon-ic-round-refresh class="text-icon" />
            </template>
            刷新数据
          </NButton>
        </template>
        
        <div class="flex-col-stretch gap-16px">
          <!-- 加载状态 -->
          <div v-if="loading" class="flex-center py-20px">
            <NSpin size="medium" />
            <span class="ml-8px">正在加载学生数据...</span>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="error" class="flex-center py-20px">
            <NAlert type="error" :title="error" />
          </div>
          
          <!-- 数据表格 -->
          <div v-else-if="students.length > 0">
            <NDataTable
              :columns="columns"
              :data="students"
              :pagination="pagination"
              :bordered="false"
              :max-height="400"
              class="sm:flex-1-hidden"
            />
          </div>
          
          <!-- 空数据状态 -->
          <div v-else class="flex-center py-20px">
            <NEmpty description="暂无学生数据" />
          </div>
        </div>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { NButton, NCard, NDataTable, NSpin, NAlert, NEmpty, type DataTableColumns } from 'naive-ui';
import { IconIcRoundRefresh } from '@iconify/vue';
import { getStudents, type Student } from '@/service/supabase';

// 响应式数据
const students = ref<Student[]>([]);
const loading = ref(false);
const error = ref('');

// 分页配置
const pagination = {
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  showQuickJumper: true
};

// 表格列配置
const columns: DataTableColumns<Student> = [
  {
    title: '序号',
    key: 'index',
    width: 80,
    render: (_, index) => index + 1
  },
  {
    title: '姓名',
    key: 'name',
    width: 120
  },
  {
    title: '性别',
    key: 'sex',
    width: 80,
    render: (row) => {
      const sexMap = {
        '男': { type: 'success', text: '男' },
        '女': { type: 'warning', text: '女' },
        'male': { type: 'success', text: '男' },
        'female': { type: 'warning', text: '女' }
      };
      const sexInfo = sexMap[row.sex as keyof typeof sexMap] || { type: 'default', text: row.sex };
      return h('span', {
        class: `px-2 py-1 rounded text-xs bg-${sexInfo.type}-100 text-${sexInfo.type}-600`
      }, sexInfo.text);
    }
  },
  {
    title: '年龄',
    key: 'age',
    width: 80,
    render: (row) => `${row.age}岁`
  }
];

// 获取学生数据
async function fetchStudents() {
  loading.value = true;
  error.value = '';
  
  try {
    const data = await getStudents();
    students.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取学生数据失败';
    console.error('获取学生数据失败:', err);
  } finally {
    loading.value = false;
  }
}

// 刷新数据
function handleRefresh() {
  fetchStudents();
}

// 组件挂载时获取数据
onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
.min-h-500px {
  min-height: 500px;
}

.flex-col-stretch {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gap-16px {
  gap: 16px;
}

.gap-8px {
  gap: 8px;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-auto {
  overflow: auto;
}

.flex-1-hidden {
  flex: 1;
  overflow: hidden;
}

.py-20px {
  padding: 20px 0;
}

.py-1 {
  padding: 0.25rem 0;
}

.px-2 {
  padding: 0 0.5rem;
}

.ml-8px {
  margin-left: 8px;
}

.text-icon {
  font-size: 16px;
}

.text-xs {
  font-size: 0.75rem;
}

.rounded {
  border-radius: 0.25rem;
}

.bg-success-100 {
  background-color: #f0f9ff;
}

.text-success-600 {
  color: #0284c7;
}

.bg-warning-100 {
  background-color: #fef3c7;
}

.text-warning-600 {
  color: #d97706;
}

.bg-default-100 {
  background-color: #f3f4f6;
}

.text-default-600 {
  color: #6b7280;
}

@media (max-width: 640px) {
  .lt-sm\:overflow-auto {
    overflow: auto;
  }
}

@media (min-width: 640px) {
  .sm\:flex-1-hidden {
    flex: 1;
    overflow: hidden;
  }
}
</style>
