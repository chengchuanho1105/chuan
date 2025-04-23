fetch("/layout/head.html")
  .then((res) => res.text())
  .then((html) => {
    document.head.insertAdjacentHTML("beforeend", html);
  });