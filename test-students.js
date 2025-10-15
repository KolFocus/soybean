// 这是一个测试脚本，用于在 Supabase 中插入测试学生数据
// 您可以在浏览器控制台中运行此脚本来添加测试数据

import { supabase } from './src/service/supabase';

// 测试学生数据
const testStudents = [
  { name: '张三', sex: '男', age: 20 },
  { name: '李四', sex: '女', age: 19 },
  { name: '王五', sex: '男', age: 21 },
  { name: '赵六', sex: '女', age: 18 },
  { name: '钱七', sex: '男', age: 22 }
];

// 插入测试数据的函数
async function insertTestStudents() {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert(testStudents);

    if (error) {
      console.error('插入数据失败:', error);
      return;
    }

    console.log('测试学生数据插入成功:', data);
  } catch (err) {
    console.error('插入数据异常:', err);
  }
}

// 导出函数供外部调用
export { insertTestStudents };

// 如果您想在浏览器控制台中直接运行，可以取消注释下面的代码
// insertTestStudents();
