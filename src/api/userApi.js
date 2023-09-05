import axiosClient from "./axiosClient";

const userApi = {
    checkCredentials(accoutObject) {
        const url = '/Account/login';
        const username = accoutObject.emailId;
        const password = accoutObject.password;
        return axiosClient.post(url, null, {
            params: {
                username,
                password
            }
        })


    },
}

export default userApi;