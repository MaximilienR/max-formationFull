const convertToEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Google Drive
  const driveRegex = /drive\.google\.com\/file\/d\/([^/]+)\/view/;
  const driveMatch = url.match(driveRegex);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // Si aucun match
  return url;
};

export { convertToEmbedUrl };
