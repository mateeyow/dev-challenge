import axios from 'axios'

const fetch = axios.create({ baseURL: 'http://localhost:8080' })

fetch.interceptors.response.use((res) => res.data)

export default fetch
