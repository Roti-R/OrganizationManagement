import axiosClient from "./axiosClient";

const organizationApi = {
    getAllOrganization() {
        const url = '/Organization/';
        return axiosClient.get(url);
    },
    getOrganizationByType(type) {
        const url = '/Organization/' + type;
        return axiosClient.get(url);
    },
    createOrganization(organizationData) {
        const url = '/Organization';
        return axiosClient.post(url, organizationData);
    },
    deleteOrganization(orgID) {
        const url = '/Organization/' + orgID;
        return axiosClient.delete(url, orgID);
    },




}


export default organizationApi;