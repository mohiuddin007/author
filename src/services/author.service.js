import request from '../request/request';

export async function getAuthors(params) {
  return await request("/authors?limit=10&skip=20", {method: "GET", data: {}}, params.header);
}

