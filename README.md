# Landscape Photographer Planner

风光摄影师出行规划器 - 帮助风光摄影师规划拍摄行程的智能工具。

## 功能特性

- 🗺️ **智能路线规划** - 根据景点位置、最佳拍摄时间自动规划最优路线
- 🌤️ **精准天气预报** - 查看到达景点时的天气、日出日落、月相等信息
- 📷 **拍摄建议** - 推荐机位、器材、拍摄技巧
- 📝 **行程管理** - 创建、编辑、保存历史行程

## 技术栈

### 前端
- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router

### 后端
- Node.js + NestJS
- TypeScript
- TypeORM

### 数据库
- PostgreSQL + PostGIS

### 外部服务
- 高德地图 API（地图/POI/路线规划）
- 和风天气 API（天气/天象数据）

## 项目结构

```
landscape-photographer-planner/
├── frontend/          # React 前端项目
│   ├── src/
│   │   ├── components/   # 公共组件
│   │   ├── pages/        # 页面组件
│   │   ├── services/     # API 服务
│   │   ├── types/        # TypeScript 类型
│   │   └── ...
│   └── ...
├── backend/           # NestJS 后端项目
│   ├── src/
│   │   ├── modules/      # 业务模块
│   │   │   ├── auth/     # 用户认证
│   │   │   ├── spots/    # 景点管理
│   │   │   ├── trips/    # 行程管理
│   │   │   ├── weather/  # 天气服务
│   │   │   └── map/      # 地图服务
│   │   ├── entities/     # 数据库实体
│   │   ├── common/       # 公共模块
│   │   └── config/       # 配置文件
│   └── ...
├── docs/              # 文档
│   └── REQUIREMENTS.md   # 需求文档
└── README.md
```

## 快速开始

### 环境要求
- Node.js >= 18
- PostgreSQL >= 14
- npm 或 yarn

### 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

### 配置环境变量

复制 `backend/.env.example` 为 `backend/.env` 并填写配置：

```env
# 数据库配置
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=landscape_planner

# JWT 配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# 高德地图 API
AMAP_KEY=your_amap_key

# 和风天气 API
QWEATHER_KEY=your_qweather_key

# 应用配置
APP_PORT=3000
APP_ENV=development
```

### 启动开发服务器

```bash
# 后端
cd backend
npm run start:dev

# 前端
cd frontend
npm run dev
```

- 前端访问: http://localhost:5173
- 后端 API: http://localhost:3000

## 开发进度

- [x] 项目初始化
- [x] 需求设计
- [x] 技术选型
- [x] 项目结构搭建
- [ ] 核心功能开发
- [ ] 测试
- [ ] 部署

## API 文档

启动后端服务后，访问 http://localhost:3000/api 查看接口文档。

## 作者

RIOTSAKURA

## License

MIT
