//本地存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token);
}
//获取token
// export const getToken = ()=>{
//     localStorage.getItem('TOKEN');
// }
//清除本地存储
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN');
}