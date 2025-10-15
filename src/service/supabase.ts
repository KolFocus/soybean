import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://plvjtbzwbxmajnkanhbe.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdmp0Ynp3YnhtYWpua2FuaGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODE4NjUsImV4cCI6MjA3NTk1Nzg2NX0.oQVOyp-dGdUqctn6dfvhWnFp2TUDOwY_y0M5_vl9e7U';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 学生表类型定义
export interface Student {
  id?: number;
  name: string;
  sex: string;
  age: number;
}

// 获取学生列表
export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('获取学生数据失败:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('获取学生数据异常:', error);
    throw error;
  }
}
