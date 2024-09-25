import { createRequest } from './request'

export const request = createRequest({ baseURL: window._config.baseUrl })
