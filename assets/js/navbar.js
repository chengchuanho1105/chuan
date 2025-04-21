// 監聽捲動，變更 navbar 背景
function enableNavbarScrollEffect() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

// 設定 nav-link active 狀態
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (
      currentPath === linkPath ||
      (currentPath === "/" && linkPath === "/index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 呼叫這些功能（在 navbar 載入後使用）
function initNavbarFeatures() {
  enableNavbarScrollEffect();
  setActiveNavLink();
}

export { initNavbarFeatures };
