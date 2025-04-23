fetch("/layout/header.html")
  .then((res) => res.text())
  .then((html) => {
    // 插入 header HTML
    document.body.insertAdjacentHTML("beforeend", html);

    // 套用 active 狀態到對應的 nav-link
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

    // 等 header 載入後再掛上 scroll 事件監聽
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // 判斷是首頁還是其他頁面，並設定 banner 樣式
    const body = document.body;
    // 根據當前頁面的 URL 判斷
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
      // 頁面是首頁
      body.classList.add('homepage');
    } else {
      // 其他頁面
      body.classList.add('otherpage');
    }
  });
