# Smart Paper Filename Transform

一个极简的快速生成论文文件名的划词工具（Chrome 扩展），选中英文论文题目后，通过右键菜单将其转换为适合作为文件名的安全字符串，并自动复制到剪贴板。  
适合为论文、文档、资料生成整洁的文件名，以**摆脱在下载论文时，文件名为一长串数字或无意义字母的困境**。

A minimal tool for quickly generating paper file names by text selection. Select an English paper title, right-click to convert it into a file-system–safe string, and automatically copy it to the clipboard.  
Ideal for creating clean filenames for papers, documents, and research materials, **helping you avoid the hassle of downloading papers with filenames that are long strings of numbers or meaningless letters**

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
2. 将文件夹Smart-Paper-Filename-Transform导入Chrome插件管理器
   Import the folder Smart - Paper - Filename - Transform into the Chrome plugin manager, and then you can use it.
3. 鼠标划词选中论文标题，然后右键点击该插件，即可将转换后的文件名复制到剪切板，粘贴即可使用
   Select the title of the paper by mouse - highlighting the words, then right - click on the plugin. The converted file name can be copied to the clipboard, and you can use it by pasting.
4. 文件名被指定为 **[年份]-[会议/期刊名]--论文标题**，年份和会议/期刊名预留，可自行填充
   The file name is specified as **[Year]-[Conference/Journal Name]--Title of the Paper**. The year and the conference/journal name are left blank and can be filled in by yourself.

---
## 不足 / insufficient
- 缺乏对file本地文件的支持。此时，需要复制论文文件的标题到浏览器其他页面，在使用本插件
  There is a lack of support for local file files. At this time, you need to copy the title of the thesis file to another browser page before using this plugin.
