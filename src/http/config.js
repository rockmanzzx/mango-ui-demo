import { baseUrl } from '@/utils/global'

export default {
    method: 'post',
    baseUrl: baseUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {},
    timeout: 10000,
    withCredentials: true, // 跨域请求，允许发送cookie
    responseType: 'json' // 默认值
}