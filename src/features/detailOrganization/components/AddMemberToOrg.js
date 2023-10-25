import React from 'react'
import SelectBox from '../../../components/Input/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SearchBar from '../../../components/Input/SearchBar';
import ErrorText from '../../../components/Typography/ErrorText';
import { updateMember } from '../../members/memberSlice';
import { showNotification } from '../../common/headerSlice';

export const AddMemberToOrg = ({ extraObject, closeModal }) => {

    const dispatch = useDispatch();

    const { index } = extraObject;
    const { members } = useSelector(state => state.member)
    const memberNotInOrg = members.filter(m => m.currentOrganizationID === null)
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearchChange = (value) => {
        setSearchText(value);
    }
    const updateFormValue = (value) => {
        setSelectedMember(value)
    }

    const saveNewMember = () => {
        if (selectedMember === 'PLACEHOLDER') return setErrorMessage("Hãy chọn người muốn thêm")
        else {
            let updateObject = {
                ...memberNotInOrg.find(m => m.memberID === selectedMember),
                currentOrganizationID: index
            }
            dispatch(updateMember({ memberID: selectedMember, member: updateObject })).unwrap()
                .then((res) => {
                    closeModal();
                    dispatch(
                        showNotification({
                            message: 'Thêm thành viên thành công',
                            status: 1,
                        })
                    );
                })
                .catch(err => {
                    closeModal();
                    console.log(err);
                    dispatch(
                        showNotification({
                            message: 'Thêm thành viên không thành công',
                            status: 0,
                        })
                    );
                })
        }
    }
    return (
        <>
            <SearchBar placeholderText={"Tìm theo tên"} searchText={searchText} styleClass="mr-4" setSearchText={handleSearchChange} />
            <SelectBox
                options={memberNotInOrg.filter(m => { return searchText === "" || m.name.toLowerCase().includes(searchText.toLowerCase()) })}
                labelTitle="Các thành viên chưa có hội"
                placeholder="Chọn thành viên"
                containerStyle="w-full mt-4"
                updateFormValue={updateFormValue}
                nameKey='memberID'
            />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Hủy</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewMember()}>LƯU</button>
            </div>
        </>
    )

}
export default AddMemberToOrg
