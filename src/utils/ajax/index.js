import axios from 'axios';
import { Message as message, Notification as notification } from 'element-ui';
import route from '@/router';
import store from '@/store';

const baseUrl = 'http://118.25.4.128:8095';
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
        // message({
        //   message: response.data.msg || defaultMsg,
        //   type: 'error',
        // });
        const err = new Error(response.data.msg || defaultMsg);
        err.code = -8999;
        // throw err;

        return Promise.reject(err);
      }
    } else {
        // 服务器级别错误
        // message({
        //   message: response.data.msg || defaultMsg,
        //   type: 'error',
        // });
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

    // let msg = '访问服务器失败';
    // if (error) {
    //   if (error.data && error.data.msg) {
    //     msg = error.data.msg;
    //   } else {
    //     msg = error.message || error;
    //   }
    // }

    // // message.error(msg);
    // message({
    //   message: msg,
    //   type: 'error',
    // });

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
  const {auth = true, ...other} = options;
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
    // console.log('err', Object.values(err));
    console.log('出错了', err);
    message({
      message: err,
      type: 'error',
    });
    throw err;
  });
};

export default ajax;
