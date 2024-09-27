import { baseUrl } from '@/utils/global';

export function getIframePath(url) {
    let iframeUrl = ''
    if (/^iframe:.*/.test(url)) {
        iframeUrl = url.replace('iframe:', '')
    } else if (/^http[s]?:\/\/.*/.test(url)) {
        iframeUrl = url.replace('http://', '')
        if (iframeUrl.indexOf(':') != -1) {
            iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(':') + 1)
        }
    }
    return iframeUrl
}

export function getIframeUrl(url) {
    let iframeUrl = ''
    if (/^iframe:.*/.test(url)) {
        iframeUrl = baseUrl + url.replace('iframe:', '')
    } else if (/^http[s]?:\/\/.*/.test(url)) {
        iframeUrl = url
    }
    return iframeUrl
}