# Cari Teks Video API

> Layanan API untuk mencari teks pada subtitle YouTube

## 🌎 Bahasa

Baca deskripsi ini dalam bahasa lain:

- [🇬🇧 English](./readme.md)

## Deskripsi

API ini semula digunakan untuk latihan pada webinar Vue.js Fundamental. Teman-teman dapat melihat rekaman ulangnya di [YouTube: Vue.js Fundamental](https://www.youtube.com/watch?v=kvDxWcxhh7c). Jika teman-teman penasaran bagaimana API ini bekerja di balik layar, teman-teman dapat mempelajarinya pada blog saya, [jefrydco](https://jefrydco.id/blog/).

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
| url            | String           | https://www.youtube.com/watch?v=klnvttPfOUM | -              | Yes        | URL video YouTube yang ingin kita cari kata-katanya                           |
| q              | String           | web                                         | -              | Yes        | Kata kunci yang digunakan                                                     |
| page           | Number           | 1                                           | 1              | No         | Memfilter hasil pencarian berdasarkan halaman                                 |
| size           | Number           | 10                                          | 10             | No         | Memfilter seberapa banyak hasil pencarian yang tampil dalam sekali permintaan |
| marked         | Boolean (0 or 1) | 1                                           | 1              | No         | Mencetak tebal kata kunci di hasil pencarian                                  |
| paginated      | Boolean (0 or 1) | 1                                           | 1              | No         | Membuat paginasi untuk hasil pencarian atau tidak                             |


### _Response_

| Nama Kunci | Tipe Data   | Contoh Nilai                                                                                                                         | Deskripsi                                                                                                                                |
|------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| data       | Array<item> | [{start: 1000, end: 1200, text: “lorem ipsum”}]                                                                                      | Daftar hasil pencarian                                                                                                                   |
| first      | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | Tautan halaman pertama dari hasil pencarian                                                                                              |
| last       | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=23&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM | Tautan halaman terakhir dari hasil pencarian                                                                                             |
| prev       | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | Tautan halaman sebelumnya dari hasil pencarian. Jika nilainya null berarti hasil pencarian tersebut tidak memiliki halaman sebelumnya    |
| next       | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=3&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | Tautan halaman selanjutnya dari hasil pencarian. Jika nilainya null berarti hasil pencarian tersebut tidak memiliki halaman selanjutnya. |
| total      | Number      | 229                                                                                                                                  | Total item hasil pencarian                                                                                                               |
| page       | Number      | 2                                                                                                                                    | Halaman pencarian sekarang                                                                                                               |


Setiap item di data berisi:

| Key   | Data Type | Example Value                                                                                   | Description                                       |
|-------|-----------|-------------------------------------------------------------------------------------------------|---------------------------------------------------|
| start | Number    | 7098                                                                                            | Detik ke-berapa kata kunci yang dimaksud dimulai  |
| end   | Number    | 7100                                                                                            | Detik ke-berapa kata kunci yang dimaksud berakhir |
| text  | String    | "in &lt;mark class=\"cvt-highlight\"&gt;Web&lt;/mark&gt;P because when we first built Squoosh," | Teks yang mengandung kata kunci yang dimaksud     |


### Contoh

```
curl -XPOST 'https://cari-teks-video-api.vercel.app/api/search?url=https://www.youtube.com/watch?v=klnvttPfOUM&q=web'

{
  "data": [
    {
      "start": 117,
      "end": 120,
      "text": "a <mark class=\"cvt-highlight\">web</mark>site that helps you find, well, local food banks."
    },
    {
      "start": 1502,
      "end": 1503,
      "text": "<mark class=\"cvt-highlight\">Web</mark> apps should be able to deliver"
    },
    {
      "start": 2103,
      "end": 2105,
      "text": "So <mark class=\"cvt-highlight\">web</mark>pack doesn't actually convert modules"
    },
    {
      "start": 2255,
      "end": 2258,
      "text": "that <mark class=\"cvt-highlight\">web</mark>pack 5 will finally be able to address that problem."
    },
    {
      "start": 5188,
      "end": 5190,
      "text": "In <mark class=\"cvt-highlight\">web</mark>pack, we do the opposite."
    },
    {
      "start": 5404,
      "end": 5408,
      "text": "any <mark class=\"cvt-highlight\">web</mark>pack_public_path magic mobile that has been set--"
    },
    {
      "start": 5437,
      "end": 5441,
      "text": "In <mark class=\"cvt-highlight\">web</mark>pack, it's a configuration value."
    },
    {
      "start": 5453,
      "end": 5455,
      "text": "<mark class=\"cvt-highlight\">web</mark>pack_public_path value."
    },
    {
      "start": 5593,
      "end": 5596,
      "text": "In <mark class=\"cvt-highlight\">web</mark>pack, each compile pass is referred to as a compilation."
    },
    {
      "start": 6875,
      "end": 6881,
      "text": "<mark class=\"cvt-highlight\">Web</mark>P, I think, also does this frequency"
    }
  ],
  "first": "https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM",
  "last": "https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=23&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM",
  "prev": null,
  "next": "https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=2&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM",
  "total": 229,
  "page": 1
}
```

## Perizinan

Kode sumber berlisensi [MIT](./license.md).
