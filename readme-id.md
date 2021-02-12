# Cari Teks Video API

> Layanan API untuk mencari teks pada subtitle YouTube

![Cari Teks Video](https://repository-images.githubusercontent.com/277871059/97eb1400-64c6-11eb-913f-bdcfe5151222)

## 🌎 Bahasa

Baca deskripsi ini dalam bahasa lain:

- [🇬🇧 English](./readme.md)

## Deskripsi

API ini semula digunakan untuk latihan pada webinar Vue.js Fundamental. Teman-teman dapat melihat rekaman ulangnya di [YouTube: Vue.js Fundamental](https://www.youtube.com/watch?v=kvDxWcxhh7c). Jika teman-teman penasaran bagaimana API ini bekerja di balik layar, teman-teman dapat mempelajarinya pada blog saya, [jefrydco](https://jefrydco.id/blog/search-closed-captions-text-youtube-video/).

## Daftar Keren

Teman-teman dapat melihat daftar aplikasi keren yang dibuat menggunakan API ini di https://awesome-cari-teks-video.netlify.app.

## Dokumentasi API

Setiap URL YouTube **membutuhkan waktu yang lebih lama untuk _request_ pertama kali** dan **di-_cache_ pada _request_ berikutnya**.


### _Request_

URL: https://cari-teks-video-api.vercel.app/api/search

Method: POST

Parameter Kueri:

| Nama Parameter | Tipe Data        | Contoh Nilai                                | Nilai Anggapan | Wajib Ada? | Deskripsi                                                                     |
|----------------|------------------|---------------------------------------------|----------------|------------|-------------------------------------------------------------------------------|
| url            | String           | https://www.youtube.com/watch?v=okpg-lVWLbE | -              | Yes        | URL video YouTube yang ingin kita cari kata-katanya                           |
| q              | String           | web                                         | -              | Yes        | Kata kunci yang digunakan                                                     |
| page           | Number           | 1                                           | 1              | No         | Memfilter hasil pencarian berdasarkan halaman                                 |
| size           | Number           | 10                                          | 10             | No         | Memfilter seberapa banyak hasil pencarian yang tampil dalam sekali permintaan |
| marked         | Boolean (0 or 1) | 1                                           | 1              | No         | Mencetak tebal kata kunci di hasil pencarian                                  |
| paginated      | Boolean (0 or 1) | 1                                           | 1              | No         | Membuat paginasi untuk hasil pencarian atau tidak                             |


### _Response_

| Nama Kunci | Tipe Data              | Contoh Nilai                                                                                                                                                                                                                                                           | Deskripsi                                                                                                                                |
|------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| data       | Array<item>            | `[{start: 1000, end: 1200, text: “lorem ipsum”}]`                                                                                                                                                                                                                      | Daftar hasil pencarian                                                                                                                   |
| meta       | Record<string, string> | `{title: "6 Problems with our School System", channelName: "Next School", channelUrl: "https://www.youtube.com/channel/UCEb1b2lWpBA0Ux4wi8A4yJA", channelLogoUrl: "https://yt3.ggpht.com/ytc/AAUvwnj74okT3YeIm_HwnkAtiOTVzzcrirBRm7HJcAf1=s68-c-k-c0x00ffffff-no-rj"}` | Data meta dari video                                                                                                                     |
| first      | String                 | https://cari-teks-video-api.vercel.app/api/search?page=1&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE                                                                                                                                       | Tautan halaman pertama dari hasil pencarian                                                                                              |
| last       | String                 | https://cari-teks-video-api.vercel.app/api/search?page=23&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE                                                                                                                                      | Tautan halaman terakhir dari hasil pencarian                                                                                             |
| prev       | String &vert; null     | https://cari-teks-video-api.vercel.app/api/search?page=1&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE                                                                                                                                       | Tautan halaman sebelumnya dari hasil pencarian. Jika nilainya null berarti hasil pencarian tersebut tidak memiliki halaman sebelumnya    |
| next       | String &vert; null     | https://cari-teks-video-api.vercel.app/api/search?page=3&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE                                                                                                                                       | Tautan halaman selanjutnya dari hasil pencarian. Jika nilainya null berarti hasil pencarian tersebut tidak memiliki halaman selanjutnya. |
| total      | Number                 | 229                                                                                                                                                                                                                                                                    | Total item hasil pencarian                                                                                                               |
| page       | Number                 | 2                                                                                                                                                                                                                                                                      | Halaman pencarian sekarang                                                                                                               |


Setiap item di data berisi:

| Key   | Data Type | Example Value                                                                           | Description                                       |
|-------|-----------|-----------------------------------------------------------------------------------------|---------------------------------------------------|
| start | Number    | 20                                                                                      | Detik ke-berapa kata kunci yang dimaksud dimulai  |
| end   | Number    | 22                                                                                      | Detik ke-berapa kata kunci yang dimaksud berakhir |
| text  | String    | "that the current system of &lt;mark class=\"cvt-highlight\"&gt;education&lt;/mark&gt;" | Teks yang mengandung kata kunci yang dimaksud     |


### Contoh

```shell
curl -XPOST 'https://cari-teks-video-api.vercel.app/api/search?q=education&url=https://www.youtube.com/watch?v=okpg-lVWLbE'
# Response
{
  "data": [
    {
      "start": 2,
      "end": 5,
      "text": "that something is wrong with our system of <mark class=\"cvt-highlight\">education</mark>."
    },
    {
      "start": 20,
      "end": 22,
      "text": "that the current system of <mark class=\"cvt-highlight\">education</mark>"
    },
    {
      "start": 222,
      "end": 225,
      "text": "There seems to be no room in the current <mark class=\"cvt-highlight\">education</mark> system"
    },
    {
      "start": 330,
      "end": 332,
      "text": "Our system of <mark class=\"cvt-highlight\">education</mark>,"
    },
    {
      "start": 345,
      "end": 349,
      "text": "fundamentally change our system of <mark class=\"cvt-highlight\">education</mark>."
    }
  ],
  "meta": {
    "title": "6 Problems with our School System",
    "channelName": "Next School",
    "channelUrl": "https://www.youtube.com/channel/UCEb1b2lWpBA0Ux4wi8A4yJA",
    "channelLogoUrl": "https://yt3.ggpht.com/ytc/AAUvwnj74okT3YeIm_HwnkAtiOTVzzcrirBRm7HJcAf1=s68-c-k-c0x00ffffff-no-rj"
  },
  "first": "https://cari-teks-video-api.vercel.app/api/search?page=1&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE",
  "last": "https://cari-teks-video-api.vercel.app/api/search?page=1&q=education&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dokpg-lVWLbE",
  "prev": null,
  "next": null,
  "total": 5,
  "page": 1
}
```

## Perizinan

Kode sumber berlisensi [MIT](./license.md).
