import axios from 'axios';

interface ResponseType {
  data: any;
  status: number;
  statusText: string;
}
export async function httpPost(url: string, body: object): Promise<ResponseType> {
  return axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
