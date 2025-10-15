# 测试获取功能使用说明

## 功能概述

新增的"测试获取"功能允许您从 Supabase 数据库中获取学生表数据并在管理界面中展示。

## 功能特点

- 📊 **数据展示**: 以表格形式展示学生信息
- 🔄 **实时刷新**: 支持手动刷新数据
- 📱 **响应式设计**: 支持移动端和桌面端
- 🌐 **国际化支持**: 支持中英文切换
- ⚡ **加载状态**: 显示加载和错误状态

## 学生表字段

学生表包含以下字段：
- `id`: 学生ID（自增主键）
- `name`: 学生姓名
- `sex`: 学生性别（男/女）
- `age`: 学生年龄

## Supabase 配置

项目已配置 Supabase 连接：
- **URL**: `https://plvjtbzwbxmajnkanhbe.supabase.co`
- **表名**: `学生表`

## 使用方法

1. **访问功能**: 在左侧菜单栏中点击"测试获取"
2. **查看数据**: 页面会自动加载并显示学生数据
3. **刷新数据**: 点击"刷新数据"按钮获取最新数据

## 测试数据

如果您需要测试数据，可以：

1. 在 Supabase 控制台中手动创建 `学生表` 表
2. 插入测试数据
3. 或者使用提供的测试脚本

### 创建表的 SQL

```sql
CREATE TABLE "学生表" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sex VARCHAR(10) NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 插入测试数据的 SQL

```sql
INSERT INTO "学生表" (name, sex, age) VALUES
('张三', '男', 20),
('李四', '女', 19),
('王五', '男', 21),
('赵六', '女', 18),
('钱七', '男', 22);
```

## 技术实现

- **前端框架**: Vue 3 + TypeScript
- **UI 组件**: Naive UI
- **数据库**: Supabase
- **状态管理**: 响应式数据
- **样式**: UnoCSS

## 文件结构

```
src/
├── service/
│   └── supabase.ts          # Supabase 服务配置
├── views/
│   └── test-fetch/
│       └── index.vue        # 测试获取页面组件
├── router/
│   └── routes/
│       └── index.ts         # 路由配置
└── locales/
    └── langs/
        ├── zh-cn.ts        # 中文翻译
        └── en-us.ts        # 英文翻译
```

## 注意事项

1. 确保 Supabase 项目中的 `students` 表已创建
2. 确保 Supabase 的 RLS（行级安全）策略允许读取数据
3. 如果遇到权限问题，请检查 Supabase 项目的安全设置

## 故障排除

### 常见问题

1. **数据加载失败**
   - 检查 Supabase 连接配置
   - 确认 `学生表` 表存在
   - 检查 RLS 策略设置

2. **页面显示空白**
   - 检查浏览器控制台错误信息
   - 确认路由配置正确
   - 检查组件导入路径

3. **样式显示异常**
   - 确认 UnoCSS 配置正确
   - 检查 CSS 类名拼写
   - 确认响应式断点设置
