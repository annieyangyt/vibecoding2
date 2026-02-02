# 安装指南

## 第一步：安装 Node.js

如果您的系统还没有安装 Node.js，请先安装：

### Windows 安装步骤：

1. **访问 Node.js 官网**
   - 打开浏览器访问：https://nodejs.org/
   - 下载 LTS（长期支持）版本（推荐）

2. **运行安装程序**
   - 双击下载的 `.msi` 安装文件
   - 按照安装向导完成安装（保持默认选项即可）
   - 安装完成后会自动包含 npm

3. **验证安装**
   - 打开新的 PowerShell 或命令提示符窗口
   - 运行以下命令验证：
   ```bash
   node --version
   npm --version
   ```
   - 如果显示版本号，说明安装成功

## 第二步：安装项目依赖

安装完 Node.js 后，在项目目录下运行：

```bash
npm install
```

## 第三步：启动开发服务器

```bash
npm run dev
```

服务器会自动启动并打开浏览器，访问地址：http://localhost:8888

## 其他命令

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm start
```

## 常见问题

### 如果 npm install 很慢
可以使用国内镜像源：
```bash
npm config set registry https://registry.npmmirror.com
```

### 如果端口 8888 被占用
修改 `vite.config.js` 中的 `port` 值
