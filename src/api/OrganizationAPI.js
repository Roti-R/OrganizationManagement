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

    getManagerList(orgId) {
        const url = '/Organization/manager/' + orgId;
        return axiosClient.get(url, orgId);
    },

    createManager(orgId, memberId) {
        const url = `/Organization/manager/orgId=${orgId}&memberId=${memberId}`;
        return axiosClient.post(url);
    },

    deleteManager(memberId) {
        const url = "/Organization/manager/" + memberId;
        axiosClient.delete(url, memberId);
    }



}


export default organizationApi;