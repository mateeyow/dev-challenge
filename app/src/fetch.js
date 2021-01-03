import axios from 'axios'

const { REACT_APP_SERVER_URL = 'http://localhost:8080' } = process.env
const fetch = axios.create({ baseURL: REACT_APP_SERVER_URL })

fetch.interceptors.response.use((res) => res.data)

export default fetch
