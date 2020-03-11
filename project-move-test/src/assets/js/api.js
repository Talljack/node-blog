import axios from 'axios'
export function getList () {
  return axios.get('/json/data.json').then(res => res.data)
}
