import { message } from "antd"
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios"

import { API_URL } from "./constant"

const request: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_HOST,
  },
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config }
  return newConfig
})

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },

  (error: AxiosError<unknown>) => {
    message.error(error.message)
    return Promise.reject(error.response)
  }
)

export default request
