import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    //从本地存储中拿到游客id
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //没有拿到游客id，那就自己生成并且放到本地存储中
    if(!uuid_token){
        //生成uuid
        uuid_token = uuidv4();
        //存储到本地存储中区
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}