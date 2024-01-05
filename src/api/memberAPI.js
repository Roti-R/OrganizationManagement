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
    },
    updateMember(data) {
        const url = '/Member/' + data.memberID;
        return axiosClient.put(url, data.member)
    }
}

export default memberAPI