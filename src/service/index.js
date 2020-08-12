import ajax from '@/utils/ajax';
import store from '@/store';

export const register = (data) => {
  return ajax('/user/register', data, 'post', {auth: false});
}

export const logout = (data = {}) => {
  store.commit('layout');
  return ajax('/user/logout', data, 'post');
}

export const login = (data) => {
  return ajax('/user/login', data, 'post', {auth: false}).then((res) => {
    if (res.state === 200) {
      const user = res.data;
      store.commit('setUserInfo', user);
    }
    return res;
  });
}

// 获取数据文件列表
export const fileList = (data) => ajax('/data/entry/datafile/list', data);

// 获取数据
export const fileDetail = (id) => ajax(`/data/entry/get/${id}`);

// 获取数据
export const entrySubmit = (data) => ajax(`/data/entry/get/submit`, data, 'post');


