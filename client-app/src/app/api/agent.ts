import axios, { AxiosResponse } from 'axios';
import { ISnip } from '../models/snip';

/*

This is an agent that will house all of the methods to make calls to the API using AXIOS
The default base url has been set to the api locally. 
The response body is pulled out and stored in a variable responseBody. 
The request object holds the methods that will make the
calls to the api. The returned object is 

*/

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
}

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>(resolve=>setTimeout(()=> resolve(response), ms))


const Snips = {
  list: ():Promise<ISnip[]> => request.get('/snips'),
  details: (id: string) => request.get(`/snips/${id}`),
  create: (snip: ISnip) => request.post(`/snips`, snip),
  update: (snip: ISnip) => request.put(`/snips/${snip.id}`, snip),
  delete: (id: string) => request.del(`/snips/${id}`)
}

export default {
  Snips
}