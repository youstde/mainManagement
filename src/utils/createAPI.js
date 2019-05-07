import fun from './baseCreateAPI'

const { createAPI, baseUrl: baseURL } = fun('//192.168.1.230:8099')

export const baseUrl = baseURL

export default createAPI
