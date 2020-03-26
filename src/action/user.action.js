import API from './axious.config';

const login =  (email, password) =>{
    return API
        .post(`/api/login`, {
            email,
            password,
        })
        .then(res => {
            console.log(res)
            return res
        })
}

const loginWithGoogle = () => {
    return API
        .post(`/auth/google`)
        .then(res => {
            console.log(res)
            return res
        })
}

const register = (email, password, fullName) =>{

}

const logout = () =>{

}


export const userAction = {
    login,
    loginWithGoogle,
    register,
    logout

}