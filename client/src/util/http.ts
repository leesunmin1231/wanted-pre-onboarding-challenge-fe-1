import axios from 'axios';

interface ResponseType {
  data: any;
  status: number;
  statusText: string;
}
export async function authPost(url: string, body: object): Promise<ResponseType> {
  return axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function httpGet(url: string, token: string): Promise<ResponseType> {
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

export async function httpPost(url: string, token: string, body: object): Promise<ResponseType> {
  return axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

export async function httpPut(url: string, token: string, body: object): Promise<ResponseType> {
  return axios.put(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

export async function httpDelete(url: string, token: string): Promise<ResponseType> {
  return axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}
