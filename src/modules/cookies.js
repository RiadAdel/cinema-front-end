import Cookies from 'js-cookie'

const setUserCookies = (user) =>{
    for (let key in user){
        if(user.hasOwnProperty(key)){
            Cookies.set(key,user[key])
        }
     }
}
const getUserCookies = (keys = ["token","type","username"]) =>{
    let userCookies = {};
    keys.forEach(element => {
        userCookies[element] = Cookies.get(element);
    });
    return userCookies;
}

const removeUserCookies = (keys = ["token","type","username"]) =>{
    keys.forEach(element => {
        Cookies.remove(element);
    });
}

export {removeUserCookies,setUserCookies,getUserCookies};