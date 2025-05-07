/**
 * header.js
 * --------------------------------
 * 本檔案整合了下列功能模組，負責網站 header 相關的互動行為：
 *
 * 1. setupHeaderBehavior()
 *    - 判斷當前頁面並套用 nav-link active 樣式
 *    - 根據頁面路徑判定是首頁還是其他頁面，顯示對應的 banner
 *    - 滾動頁面時，為 navbar 加上背景陰影
 *
 * 2. setupBackToTopButton()
 *    - 控制「回到頂部」按鈕的顯示與點擊滑動效果
 *
 * 3. setupScrollDownHint()
 *    - 控制「向下瀏覽」提示的點擊效果（滑動一個視窗高度）
 */

// nav active & navbar style
(function setupHeaderBehavior() {
  // 取得目前頁面路徑
  const currentPath = window.location.pathname;

  // 選取所有導覽列的 nav-link 元素
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    // 取得連結的 href
    const linkPath = link.getAttribute("href");

    // 若是首頁路徑 "/"，統一視為 "/index.html"
    const normalizedCurrentPath =
      currentPath === "/" ? "/index.html" : currentPath;

    // 將符合的 link 加上 active 樣式，其餘移除
    link.classList.toggle("active", linkPath === normalizedCurrentPath);
  });

  // 當頁面滾動時，為 navbar 添加/移除 scrolled 類別
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".custom-navbar");

    // 滾動超過 1px 時加上陰影
    navbar?.classList.toggle("scrolled", window.scrollY > 1);
  });

  const body = document.body;

  // 判斷是否為首頁
  const isHomepage = currentPath === "/" || currentPath.endsWith("/index.html");

  // 設定 body 的類別（可用於套用不同樣式）
  body.classList.toggle("homepage", isHomepage);
  body.classList.toggle("otherpage", !isHomepage);

  // 顯示對應的 banner
  const homepageBanner = document.querySelector(".banner-homepage");
  const otherpageBanner = document.querySelector(".banner-otherpage");
  const homepageBreadcrumb = document.querySelector(".breadcrumb");

  if (homepageBanner && otherpageBanner) {
    homepageBanner.style.display = isHomepage ? "flex" : "none"; // home page banner
    otherpageBanner.style.display = isHomepage ? "none" : "flex"; // other page banner
    homepageBreadcrumb.style.display = isHomepage ? "none" : "flex"; //breadcrumb home page: none, other page: flex
  }

  
  
})();

// back-to-top button
(function setupBackToTopButton() {
  // 取得按鈕元素
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  // 當滾動時控制按鈕顯示與否
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 10);
  });

  // 點擊按鈕時平滑捲動至頁面頂部
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* 
// scroll down hint
(function setupScrollDownHint() {
  // 取得 scroll-down 提示元素
  const scrollHint = document.querySelector(".scroll-down");
  if (!scrollHint) return;

  // 點擊時滑動一個視窗高度
  scrollHint.addEventListener("click", () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  });
})();
*/
