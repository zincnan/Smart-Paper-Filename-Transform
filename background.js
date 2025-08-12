chrome.runtime.onInstalled.addListener(() => {
  console.log("[SmartFilename] Extension installed");
  chrome.contextMenus.create({
    id: "smart-filename-transform",
    title: "Smart filename transform & copy",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("[SmartFilename] Menu clicked", { info, tab });

  if (info.menuItemId !== "smart-filename-transform") return;

  if (!info.selectionText || !info.selectionText.trim()) {
    console.warn("[SmartFilename] No text selected");
    return;
  }

  const transformed = smart_filename_transform(info.selectionText);
  console.log("[SmartFilename] Transformed text:", transformed);

  // file:// 页面
  if (tab?.url?.startsWith("file://")) {
    console.log("[SmartFilename] Detected file:// URL, using background copy");
    navigator.clipboard.writeText(transformed)
      .then(() => console.log("[SmartFilename] Copied from file://:", transformed))
      .catch(err => console.error("[SmartFilename] File URL copy failed:", err));
    return;
  }

  // tabId 检查
  if (!tab?.id || tab.id === -1) {
    console.log("[SmartFilename] tab.id is invalid (-1), using background copy");
    navigator.clipboard.writeText(transformed)
      .then(() => console.log("[SmartFilename] Copied from background:", transformed))
      .catch(err => console.error("[SmartFilename] Background copy failed:", err));
    return;
  }

  // 受限页面
  if (isRestrictedPage(tab.url)) {
    console.warn("[SmartFilename] Restricted page, skip injection:", tab.url);
    return;
  }

  // 普通网页：注入复制
  console.log("[SmartFilename] Injecting copy script into tab", tab.id, tab.url);
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: text => {
      console.log("[SmartFilename Injected] Creating hidden textarea");
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const ok = document.execCommand("copy");
        console.log("[SmartFilename Injected] execCommand copy result:", ok);
      } catch (err) {
        console.error("[SmartFilename Injected] Copy failed:", err);
      }
      textarea.remove();
    },
    args: [transformed]
  }).then(() => {
    console.log("[SmartFilename] Injection script executed successfully");
  }).catch(err => {
    console.error("[SmartFilename] Injection failed:", err);
  });
});

function smart_filename_transform(filename) {
  console.log("[SmartFilename] Running transform on:", filename);
  const mapping = {
    " ": "_",
    ":": "=",
    "/": "-",
    "\\": "-",
    "|": "-",
    "*": "",
    "?": "",
    '"': "'",
    "<": "",
    ">": ""
  };
  let result = filename;
  for (const [oldChar, newChar] of Object.entries(mapping)) {
    result = result.split(oldChar).join(newChar);
  }
  result = result.replace(/_{2,}/g, "_");
  result = result.replace(/-{2,}/g, "-");
  result = result.replace(/^[_\-=]+|[_\-=]+$/g, "");
  result = result = `[]+[]--${result}`;
  return result;
}

function isRestrictedPage(url) {
  return (
    url.startsWith("chrome://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("moz-extension://")
  );
}
