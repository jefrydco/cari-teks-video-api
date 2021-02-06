# Cari Teks Video API

> API service for searching text in YouTube subtitle

![Cari Teks Video](https://repository-images.githubusercontent.com/277871059/97eb1400-64c6-11eb-913f-bdcfe5151222)

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

| Key   | Data Type              | Example Value                                                                                                                                                                                                                                                        | Description                                                           |
|-------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| data  | Array<item>            | [{start: 1000, end: 1200, text: "lorem ipsum"}]                                                                                                                                                                                                                      | Search result                                                         |
| meta  | Record<string, string> | {title: "6 Problems with our School System", channelName: "Next School", channelUrl: "https://www.youtube.com/channel/UCEb1b2lWpBA0Ux4wi8A4yJA", channelLogoUrl: "https://yt3.ggpht.com/ytc/AAUvwnj74okT3YeIm_HwnkAtiOTVzzcrirBRm7HJcAf1=s68-c-k-c0x00ffffff-no-rj"} | Meta data of the video                                                |
| first | String                 | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM                                                                                                                                  | URL to first page                                                     |
| last  | String                 | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=23&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM                                                                                                                                 | URL to last page                                                      |
| prev  | String &vert; null     | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=1&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM                                                                                                                                  | URL to prev page. If the value is null, it doesn't have previous page |
| next  | String &vert; null     | https://cari-teks-video-api.jefrydco.vercel.app/api/search?page=3&q=web&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DklnvttPfOUM                                                                                                                                  | URL to next page. If the value is null, it doesn't have next page     |
| total | Number                 | 229                                                                                                                                                                                                                                                                  | Search result total item                                              |
| page  | Number                 | 2                                                                                                                                                                                                                                                                    | Current result page                                                   |



Each item in data containing:

| Key   | Data Type | Example Value                                                                                   | Description                             |
|-------|-----------|-------------------------------------------------------------------------------------------------|-----------------------------------------|
| start | Number    | 7098                                                                                            | In which seconds the keyword is started |
| end   | Number    | 7100                                                                                            | In which seconds the keyword is ended   |
| text  | String    | "in &lt;mark class=\"cvt-highlight\"&gt;Web&lt;/mark&gt;P because when we first built Squoosh," | Text contains the keyword               |


### Example

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

## License

Source code is available under [MIT License](./license.md).
