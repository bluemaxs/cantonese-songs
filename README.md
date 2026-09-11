# 粵語歌跟唱練習

逐字廣州話拼音注音的粵語歌跟唱頁面，附曲目菜單。
拼音依據《粵語（香港話）教程（修訂版）》所用的廣州話拼音方案。

## 檔案結構

```
index.html            曲目菜單（入口頁）
assets/style.css      歌詞頁樣式（沿用原本滿意的樣式，未改動）
assets/menu.css       菜單與曲目卡片的樣式
assets/songs.js       曲目清單（新增歌曲時改這裡）
assets/menu.js        菜單邏輯（下拉選單、搜尋）
songs/<slug>.html     每首歌一頁
songs/_template.html  新歌模板
```

## 新增一首歌

1. 複製 `songs/_template.html` 成 `songs/<slug>.html`（`<slug>` 用英文小寫與連字號）。
2. 修改頁面裡的 `<body data-base="../" data-song="<slug>">`，讓它跟曲目清單一致。
3. 填入歌名、段落 `<section>` 與逐字注音 `<ruby>字<rt>拼音</rt></ruby>`；
   `／` 用 `<span class="pause">／</span>`，段內小分隔用 `<hr class="divider">`。
4. 在 `assets/songs.js` 的陣列加一筆：

```js
{
  slug: "new-song",
  title: "歌名",
  artist: "歌手",              // 可省略
  file: "songs/new-song.html",
  meta: "廣州話拼音逐字注音・跟唱版"
}
```

## 本機預覽

直接雙擊 `index.html` 即可，不需要伺服器。

若要用本機伺服器預覽：

```sh
python3 -m http.server 8000
# 然後開啟 http://localhost:8000
```

## 發佈到 GitHub Pages

這個資料夾已經是可直接發佈的靜態網站。做法：

```sh
cd cantonese-songs
git init -b main
git add .
git commit -m "Add Cantonese song reader"
```

在 GitHub 建立一個新的 repository（可設為 Public），然後：

```sh
git remote add origin git@github.com:<你的帳號>/<repo 名稱>.git
git push -u origin main
```

推送完成後，到 repository 的 **Settings → Pages**，
在 *Build and deployment* 選 **Deploy from a branch**，
分支選 `main`、資料夾選 `/ (root)`，儲存後等一兩分鐘，
網址會是 `https://<你的帳號>.github.io/<repo 名稱>/`。

`.nojekyll` 已包含在內，GitHub Pages 會直接輸出所有檔案（包含以底線開頭的 `songs/_template.html`）。
