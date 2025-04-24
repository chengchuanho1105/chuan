document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("media-container");

  Papa.parse("/assets/media/video-list.csv", {
    download: true,
    header: true,
    complete: function (results) {
      results.data.forEach((item) => {
        const videoId = extractYouTubeId(item.URL);
        if (!videoId) return;

        // 外層 col
        const wrapper = document.createElement("div");
        wrapper.classList.add("col-sm-12", "col-lg-6", "col-xl-4", "my-2", "p-1");

        // 卡片 HTML
        wrapper.innerHTML = `
          <div class="mediaCard">
            <div class="imgContainer">
              <iframe
                width="100%"
                height="300"
                src="https://www.youtube-nocookie.com/embed/${videoId}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <p class="title">${item.TITLE}</p>
            <p class="des">${item.DES}</p>
          </div>
        `;

        container.appendChild(wrapper);
      });
    },
  });

  function extractYouTubeId(url) {
    try {
      const u = new URL(url);

      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1); // youtu.be/VIDEO_ID
      }

      if (u.hostname.includes("youtube.com")) {
        if (u.pathname === "/watch") {
          return u.searchParams.get("v"); // youtube.com/watch?v=VIDEO_ID
        }

        if (u.pathname.startsWith("/embed/")) {
          return u.pathname.split("/embed/")[1].split("?")[0]; // youtube.com/embed/VIDEO_ID
        }
      }

      return null;
    } catch (e) {
      return null;
    }
  }
});
