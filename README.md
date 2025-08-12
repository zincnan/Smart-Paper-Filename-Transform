# Smart Paper Filename Transform

一个极简的快速生成论文文件名的划词工具（Chrome 扩展），选中英文论文题目后，通过右键菜单将其转换为适合作为文件名的安全字符串，并自动复制到剪贴板。  
特别适合为论文、文档、资料生成整洁的文件名。

A minimal tool for quickly generating paper file names by text selection. Select an English paper title, right-click to convert it into a file-system–safe string, and automatically copy it to the clipboard.  
Perfect for generating clean filenames for papers, documents, and research materials.

---

## 功能特点 / Features
- **一键转换 / One-click transform**：右键选中文本 → 自动替换特殊字符为安全字符  
  Right-click selected text → automatically replace special characters with safe ones.
- **自动复制 / Auto copy**：转换结果直接进入剪贴板，无需手动复制  
  The transformed result is copied to the clipboard automatically.
- **本地处理 / Local processing**：所有逻辑在浏览器端完成，不上传任何数据  
  All processing happens locally in the browser; no data is uploaded.
- **轻量无依赖 / Lightweight & dependency-free**：代码简单，易于二次开发  
  Simple codebase, easy to customize.

---

## 转换规则 / Transformation Rules
- 空格 (space) → `_`
- `:` → `=`
- `/`、`\\`、`|` → `-`
- `*`、`?`、`<`、`>` → 删除 / remove
- `"` → `'`
- 连续 `_` 压缩为单个 `_` / Collapse multiple `_` into one
- 连续 `-` 压缩为单个 `-` / Collapse multiple `-` into one
- 去除文件名首尾的 `_`、`-`、`=` / Trim leading/trailing `_`, `-`, `=`

---

## 安装 / Installation
1. 下载或克隆本仓库 / Download or clone this repository
   ```bash
   git clone https://github.com/zincnan/Smart-Paper-Filename-Transform.git
## 不足 / insufficient
- 缺乏对file本地文件的支持。此时，需要复制论文文件的标题到浏览器其他页面，在使用本插件
  There is a lack of support for local file files. At this time, you need to copy the title of the thesis file to another browser page before using this plugin.
