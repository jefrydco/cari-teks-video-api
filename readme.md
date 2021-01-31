# Cari Teks Video API

> API service for searching text in YouTube subtitle

## 🌎 Languages

Read this description in another languages:

- [🇮🇩 Indonesian](./readme-id.md)

## Description

Cari Teks Video is Indonesian language of Search Text (in) Video.

This API was intended to be used as an exercise in Vue.js Fundamental webinar. You can watch the playback in [YouTube: Vue.js Fundamental](https://www.youtube.com/watch?v=kvDxWcxhh7c). If you curious how this API works under the hood, learn on my blog, [jefrydco](https://jefrydco.id/blog/).

## Awesome List

You can take a look on awesome app that make use this API in https://awesome-cari-teks-video.netlify.app.

## API Documentation

Each YouTube URL **needs longer time to request at first** and **cached on next hit**.

### Request

URL: https://cari-teks-video-api.vercel.app/api/search

Method: POST

Query Params:

| Parameter Name | Data Type        | Example Value                               | Default Value | Required | Description                                |
|----------------|------------------|---------------------------------------------|---------------|----------|--------------------------------------------|
| url            | String           | https://www.youtube.com/watch?v=klnvttPfOUM | -             | Yes      | YouTube video URL                          |
| q              | String           | web                                         | -             | Yes      | The keyword                                |
| page           | Number           | 1                                           | 1             | No       | Current page number                        |
| size           | Number           | 10                                          | 10            | No       | Number of result returned in one request   |
| marked         | Boolean (0 or 1) | 1                                           | 1             | No       | Highlight keyword in search result or not  |
| paginated      | Boolean (0 or 1) | 1                                           | 1             | No       | Paginate the result or not                 |

### Response

| Key   | Data Type   | Example Value                                                                                                                        | Description                                                           |
|-------|-------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| data  | Array<item> | [{start: 1000, end: 1200, text: “lorem ipsum”}]                                                                                      | Search result                                                         |
| first | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | URL to first page                                                     |
| last  | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=23&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM | URL to last page                                                      |
| prev  | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | URL to prev page. If the value is null, it doesn't have previous page |
| next  | String      | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=3&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM  | URL to next page. If the value is null, it doesn't have next page     |
| total | Number      | 229                                                                                                                                  | Search result total item                                              |
| page  | Number      | 2                                                                                                                                    | Current result page                                                   |


Each item in data containing:

| Key   | Data Type | Example Value                                                                                   | Description                             |
|-------|-----------|-------------------------------------------------------------------------------------------------|-----------------------------------------|
| start | Number    | 7098                                                                                            | In which seconds the keyword is started |
| end   | Number    | 7100                                                                                            | In which seconds the keyword is ended   |
| text  | String    | "in &lt;mark class=\"cvt-highlight\"&gt;Web&lt;/mark&gt;P because when we first built Squoosh," | Text contains the keyword               |


### Example

```shell
curl -XPOST 'https://cari-teks-video-api.vercel.app/api/search?url=https://www.youtube.com/watch?v=klnvttPfOUM&q=web'
# Response
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

## License

Source code is available under [MIT License](./license.md).
