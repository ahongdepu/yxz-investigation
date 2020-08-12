
// 按需引入  减少包体积
import { Button, Input, Form, FormItem, Checkbox, Menu, MenuItem, Table, TableColumn, Pagination, Message } from 'element-ui';
import Vue from 'vue';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Message);


Vue.prototype.$message = Message;

