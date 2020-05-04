function thumbnailImgSrc (size) {
  return function (media) {
    if (Array.isArray(media.thumbnails) && media.thumbnails.length > 0) {
      const thumbnail = media.thumbnails.find(
        thumbnail => Math.max(thumbnail.width, thumbnail.height) >= size
      )
      if (thumbnail && thumbnail.path) {
        return thumbnail.path
      }
    }
    return media.path
  }
}

function imgClass (media) {
  if (media && media.metadata && media.metadata.orientation) {
    return `img-orientation-${media.metadata.orientation}`
  }
  return ''
}

module.exports = { thumbnailImgSrc, imgClass }
