import axios from "axios";
import config from "./config";
import Cookies from "js-cookie";
import router from "@/router";

export default function $axios(options) {
  console.log("options: ", options);

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
    });

    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        let token = Cookies.get("token");
        if (token) {
          config.headers.token = token;
        } else {
          router.push("/login");
        }
        return config;
      },
      (error) => {
        console.log("request: ", error);
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log("timeout请求超时");
        }
        const errorInfo = error.response;
        console.log(errorInfo);
        if (errorInfo) {
          error = errorInfo.data;
          const errorStatus = errorInfo.status;
          router.push({
            path: "/error/${errorStatus}",
          });
        }
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "请求错误";
              break;
            case 401:
              error.message = "未授权，请登录";
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = "请求地址出错: ${error.response.config.url}";
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 500:
              error.message = "服务器内部错误";
              break;
            case 501:
              error.message = "服务未实现";
              break;
            case 502:
              error.message = "网关错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "网关超时";
              break;
            case 505:
              error.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        console.error(error);
        return Promise.reject(error);
      }
    );

    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
