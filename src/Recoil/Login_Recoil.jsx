import {atom} from "recoil";
export const userInfo = atom({
    key:"USER_INFO",
    default:{
        email:"",
        password:""
    }
})