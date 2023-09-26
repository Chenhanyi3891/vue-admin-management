import instanceHttp from '../utils/request';

//请求首页数据接口
export const getData = () => {
  return instanceHttp.get('/home/getData');
};
