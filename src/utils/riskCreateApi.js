import fun from './baseCreateAPI'

const { createAPI, baseUrl: baseURL } = fun('//risk.znckj.com', '/risk')

export const baseUrl = baseURL

export default createAPI
