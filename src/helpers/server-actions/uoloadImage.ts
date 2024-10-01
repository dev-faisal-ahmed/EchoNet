import { API_URL } from '@/data/apiUrl';
import axios from 'axios';

export const uploadImage = async (formData: FormData) => {
  const { data: imageBBResponse } = await axios.post(
    API_URL.IMAGE_BB_URL,
    formData,
  );

  if (!imageBBResponse.success) throw new Error(imageBBResponse?.message);
  return imageBBResponse?.data?.url;
};
