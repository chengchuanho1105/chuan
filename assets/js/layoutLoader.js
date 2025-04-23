// layoutLoader.js
(async function loadLayout() {
  try {
    // 1. 載入 header 並插入到 body 開頭
    const headerRes = await fetch("/layout/header.html");
    const headerHTML = await headerRes.text();
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // 2. 設定 header 的行為（active 狀態、scroll、判斷首頁）
    setupHeaderBehavior();

    // 3. 等 header 插完再載入 footer（插在 body 結尾）
    const footerRes = await fetch("/layout/footer.html");
    const footerHTML = await footerRes.text();
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  } catch (err) {
    console.error("Layout 載入失敗：", err);
  }
})();

function setupHeaderBehavior() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const body = document.body;
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    body.classList.add("homepage");
  } else {
    body.classList.add("otherpage");
  }
}
