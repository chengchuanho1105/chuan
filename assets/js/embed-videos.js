document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("media-container");

  Papa.parse("/media/video-list.csv", {
    download: true,
    header: true,
    complete: function (results) {
      results.data.forEach((item) => {
        const videoId = extractYouTubeId(item.URL);
        if (!videoId) return;

        const card = document.createElement("div");
        card.classList.add("mediaCard", "my-2");

        card.innerHTML = `
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
          `;

        container.appendChild(card);
      });
    },
  });

  function extractYouTubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1); // /VIDEO_ID
      } else if (u.hostname.includes("youtube.com")) {
        return u.searchParams.get("v");
      }
    } catch (e) {
      return null;
    }
  }
});
