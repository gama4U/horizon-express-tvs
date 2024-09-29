import fs from 'fs';

export async function deleteUploadedFile(path: string) {
  return await fs.promises.unlink(path);
}
