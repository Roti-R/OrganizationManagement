import axiosClient from "./axiosClient";

const organizationApi = {
    getOrganizationByType(type) {
        const url = '/Organization/' + type;
        return axiosClient.get(url);
    },
    createOrganization(organizationData) {
        const url = '/Organization';
        return axiosClient.post(url, organizationData)
    }


}


export default organizationApi;