import Cookies from 'js-cookie'

const setUserCookies = (user) =>{
    for (let key in user){
        if(user.hasOwnProperty(key)){
            Cookies.set(key,user[key])
        }
     }
}
const getUserCookies = (keys = ["apiToken","type","username"]) =>{
    let userCookies = {};
    keys.forEach(element => {
        userCookies[element] = Cookies.get(element);
    });
    return userCookies;
}

const removeUserCookies = (user) =>{
    for (let key in user){
        if(user.hasOwnProperty(key)){
            Cookies.remove(key)
        }
     }
}

export {removeUserCookies,setUserCookies,getUserCookies};