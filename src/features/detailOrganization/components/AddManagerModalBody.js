import ErrorText from '../../../components/Typography/ErrorText';
import React from 'react'
import SearchBar from '../../../components/Input/SearchBar';
import SelectBox from '../../../components/Input/SelectBox';
import { createManager } from '../managerSlice';
import organizationApi from '../../../api/OrganizationAPI';
import { showNotification } from '../../common/headerSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const AddManagerModalBody = ({ extraObject, closeModal }) => {

    const dispatch = useDispatch();
    const { index } = extraObject;
    const { members } = useSelector(state => state.member)
    const memberInOrg = members.filter(m => m.currentOrganizationID === index)
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSearchChange = (value) => {
        setSearchText(value);
    }
    const updateFormValue = (value) => {
        setSelectedMember(value)
    }

    const addManager = () => {
        dispatch(createManager({ memberId: selectedMember, orgId: index })).unwrap()
            .then((res) => {
                closeModal();
                dispatch(
                    showNotification({
                        message: 'Thêm quản lý thành công',
                        status: 1,
                    })
                );
            })
            .catch((err) => {
                setErrorMessage(err.error.errors[0].errorMessage)
                dispatch(
                    showNotification({
                        message: 'Thêm quản lý không thành công',
                        status: 0,
                    })
                );
            })
    }
    return (
        <>
            <SearchBar placeholderText={"Tìm theo tên"} searchText={searchText} styleClass="mr-4" setSearchText={handleSearchChange} />
            <SelectBox
                options={memberInOrg.filter(m => { return searchText === "" || m.name.toLowerCase().includes(searchText.toLowerCase()) })}
                labelTitle="Các thành viên thuộc hội"
                placeholder="Chọn thành viên"
                containerStyle="w-full mt-4"
                updateFormValue={updateFormValue}
                nameKey='memberID'
            />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Hủy</button>
                <button className="btn btn-primary px-6" onClick={() => addManager()}>LƯU</button>
            </div>
        </>

    )
}
export default AddManagerModalBody;