import axios from 'axios';
import { Message as message, Notification as notification } from 'element-ui';
import route from '@/router';
import store from '@/store';
import tools from '@/utils';

export const baseUrl = 'http://118.25.4.128:8095';
const defaultMsg = '访问服务器失败！';

export const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10 * 1000,
});

instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status === 200) {
      if (response.data.state === 200) {
        return Promise.resolve(response.data);
      } else {
        console.log('h', response)
        // const err = new Error(response.data.msg || defaultMsg);
        // err.code = -8999;
        // throw err;

        return Promise.reject(response);
      }
    } else {
        console.log('非200', response)
        const err = new Error(response.data.msg || defaultMsg);
        err.code = -8999;
        // throw err;

        return Promise.reject(err);
    }
    // return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.log('error', error, Object.values(error), Object.keys(error));

    const res = error && error.response;
    if (res) {
      if (res.status === 401) {
        message.close();
        notification.close();
        notification.error({
          message: '登录已失效，请2秒后重新登录',
        });
        setTimeout(() => {
          route.push('/login');
        }, 2000);
        store.commit('loyout');
      }
      return res;
    }

    return Promise.reject(error);
  }
);

const ajax = (url, data = {}, method = 'get', options = {}) => {
  method = method.toLocaleLowerCase();
  // 默认开启auth认证和弹框报错
  const {auth = true, _message = true, ...other} = options;
  const config = {url, method, ...other};
  if (method === 'get') {
    config.params = data;
  } else {
    config.data = data;
  }
  if (auth) {
    const {token} = store.getters;
    config.headers = {
      ...config.headers,
      Authorization: token,
    }
  }
  return instance(config).catch((err) => {
    console.log('err', Object.values(err));
    console.log('出错了', err);
    if (_message) {
      message({
        message: err,
        type: 'error',
      });
      // throw err;
    }
    return Promise.reject(err);
  });
};

ajax.downLoad = (...param) => {
  param[3] = {
    ...param[3],
    _message: false,
    responseType: 'blob',
  };
  return ajax(...param).catch((response) => {
    if (response && response.data && !response.data.state && response.data.state !== 0) {
      const {data} = response;
      const blob = tools.downLoad(data, '标注结果.xls');
      return Promise.resolve(blob);
    } else {
      return Promise.reject(response);
    }
  })
}

export default ajax;
