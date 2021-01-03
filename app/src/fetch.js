import axios from 'axios'

const { SERVER_URL = 'http://localhost:8080' } = process.env
const fetch = axios.create({ baseURL: SERVER_URL })

fetch.interceptors.response.use((res) => res.data)

export default fetch
