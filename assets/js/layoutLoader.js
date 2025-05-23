/**
 * layoutLoader.js
 * -------------------------------
 * 此腳本負責在每個頁面上依序載入共用的 Layout。
 * 透過非同步函式確保 header 載入完成後，才載入 footer，避免插入位置錯亂。
 * 同時也會設定 header 的互動行為，例如：nav-link 的 active 狀態、滾動時加上背景陰影等。
 */
(async function loadLayout() {
  try {
    /**
     * 載入 layout 並插入至 <body> 最前面
     */

    // 載入 header
    // 發送 fetch 請求取得 header.html 的內容
    const headerRes = await fetch("/layout/header.html");
    // 將回應轉為文字格式（HTML 字串）
    const headerHTML = await headerRes.text();
    // 將 header 插入到 <body> 的開頭（即 <body> 的第一個子元素）
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // 載入 footer
    // 發送 fetch 請求取得 footer.html 的內容
    const footerRes = await fetch("/layout/footer.html");
    // 將回應轉為文字格式（HTML 字串）
    const footerHTML = await footerRes.text();
    // 把 footer 插入到 <body> 的結尾（即所有內容之後）
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // 載入 header.js
    await loadScript("/assets/js/header.js");
  } catch (err) {
    // 如果有任何錯誤，印出錯誤訊息（如網路錯誤或載入失敗）
    console.error("Layout 載入失敗：", err);
  }
})();

/**
 * 動態載入外部 JS 檔案
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
