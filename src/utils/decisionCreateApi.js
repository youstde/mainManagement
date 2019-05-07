import fun from './baseCreateAPI'

const { createAPI, baseUrl: baseURL } = fun('//decision.znckj.com', '/decision')

export const baseUrl = baseURL

export default createAPI
