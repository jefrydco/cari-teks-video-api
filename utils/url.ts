export function getYoutubeEmbedUrl(url: string) {
  // Taken from: https://stackoverflow.com/a/6904504
  const [
    _,
    id
  ] = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi.exec(
    url
  )
  return `https://www.youtube.com/embed/${id}?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1`
}
