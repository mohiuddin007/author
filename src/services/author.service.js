import request from '../request/request';

export async function getAuthors(params) {
  return await request(`/authors?limit=10&skip=${params.skipItem}`, {method: "GET", data: {}}, params.header);
}

