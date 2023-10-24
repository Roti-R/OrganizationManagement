import axiosClient from "./axiosClient";

const memberAPI = {
    getAllMember() {
        const url = '/Member';
        return axiosClient.get(url)
    },
    createMember(member) {
        const url = '/Member';
        return axiosClient.post(url, member)
    },
    deleteMember(memberID) {
        const url = '/Member/' + memberID;
        return axiosClient.delete(url, memberID);
    }
}

export default memberAPI