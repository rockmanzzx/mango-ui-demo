import axios from '../axios'

export const save = (data) => {
    return axios({
        url: '/config/save',
        method: 'post',
        data
    })
}

export const batchDelete = (data) => {
    return axios({
        url: '/config/delete',
        method: 'post',
        data
    })
}

export const findPage = (data) => {
    return axios({
        url: '/config/findPage',
        method: 'post',
        data
    })
}