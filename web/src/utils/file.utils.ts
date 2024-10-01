export const extractFileNameFormUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathName = urlObj.pathname;
  const fileName = pathName.substring(pathName.lastIndexOf('/') + 1);
  return fileName;
}
