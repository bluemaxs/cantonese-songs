(function () {
  "use strict";

  var songs = window.SONGS || [];
  var body = document.body;
  var base = body.getAttribute("data-base") || "";
  var currentSlot = body.getAttribute("data-song") || "";

  function fileOf(song) {
    return base + song.file;
  }

  /* ----------------------------------------------
     歌曲页面：顶部曲目下拉菜单
     ---------------------------------------------- */

  var select = document.getElementById("songSelect");

  if (select && songs.length) {
    select.innerHTML = "";

    songs.forEach(function (song) {
      var option = document.createElement("option");

      option.value = fileOf(song);
      option.textContent = song.title;

      if (song.slug === currentSlot) {
        option.selected = true;
      }

      select.appendChild(option);
    });

    select.addEventListener("change", function () {
      if (select.value) {
        window.location.href = select.value;
      }
    });
  }

  /* ----------------------------------------------
     曲目页面：卡片清单与搜寻
     ---------------------------------------------- */

  var list = document.getElementById("songList");

  if (!list) {
    return;
  }

  var countLabel = document.getElementById("songCount");
  var emptyState = document.getElementById("emptyState");

  songs.forEach(function (song) {
    var item = document.createElement("li");
    var card = document.createElement("a");
    var title = document.createElement("span");
    var meta = document.createElement("span");
    var keywords = [song.title, song.artist, song.meta]
      .filter(Boolean)
      .join(" ");

    card.className = "song-card";
    card.href = fileOf(song);

    title.className = "song-title";
    title.textContent = song.title;

    meta.className = "song-meta";
    meta.textContent = [song.artist, song.meta].filter(Boolean).join("・");

    card.appendChild(title);

    if (meta.textContent) {
      card.appendChild(meta);
    }

    item.appendChild(card);

    item.setAttribute("data-keywords", keywords.toLowerCase());

    list.appendChild(item);
  });

  var items = Array.prototype.slice.call(list.children);

  function updateCount(shown) {
    if (!countLabel) {
      return;
    }

    countLabel.textContent =
      shown === songs.length
        ? "共 " + songs.length + " 首"
        : "顯示 " + shown + " / " + songs.length + " 首";
  }

  updateCount(items.length);

  if (emptyState) {
    emptyState.hidden = items.length > 0;
  }

  var search = document.getElementById("songSearch");

  if (search) {
    search.addEventListener("input", function () {
      var query = search.value.trim().toLowerCase();
      var shown = 0;

      items.forEach(function (item) {
        var matched = !query || item.getAttribute("data-keywords").indexOf(query) !== -1;

        item.hidden = !matched;

        if (matched) {
          shown += 1;
        }
      });

      updateCount(shown);

      if (emptyState) {
        emptyState.hidden = shown > 0;
      }
    });
  }
})();
