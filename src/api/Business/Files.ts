import { post } from '@/utils/httpClient';

export async function UploadFile(file: File, directoryId: number | undefined) {
  const formData = new FormData();
  formData.append('file', file);
  const directoryIdQuery = directoryId ? `?directoryId=${directoryId}` : '';

  return await post(`/Files${directoryIdQuery}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
