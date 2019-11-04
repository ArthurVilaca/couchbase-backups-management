import axios from 'axios';
const BASE_URL = 'http://localhost:4444'

export async function get(url) {
	return await axios.get(BASE_URL + url)
}

export async function post(url, data) {
	return await axios.post(BASE_URL + url, data)
}
