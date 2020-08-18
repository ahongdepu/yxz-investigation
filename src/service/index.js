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

// 数据标注提交
export const entrySubmit = (data) => ajax(`/data/entry/submit`, data, 'post');


// 获取数据
export const examineList = ({projectId, ...data}) => ajax(`/data/entry/admin/get/${projectId}`, data, 'get');

// 批量审核
export const batch = (data) => ajax('/data/entry/examine/batch', data, 'post');


