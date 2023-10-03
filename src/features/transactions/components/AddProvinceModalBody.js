import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { showNotification } from '../../common/headerSlice';
import { closeModal } from '../../common/modalSlice';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import organizationApi from '../../../api/OrganizationAPI';
import { createOrganization } from '../ProvOrganizationSlice';

const INITIAL_PROVINCE_OBJ = {
    name: ''
}
const AddProvinceModalBody = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("")
    const [provinceObj, setProvinceObj] = useState(INITIAL_PROVINCE_OBJ)

    const saveNewProvince = () => {
        if (provinceObj.name.trim() === "") return setErrorMessage("Hãy điền tên tỉnh")
        else {
            //Call API to Add Province Organization
            let newProvinceObj = {
                ...provinceObj,
                type: "tinh"
            }
            dispatch(createOrganization(newProvinceObj))
            dispatch(showNotification({ message: "Thêm tỉnh mới thành công", status: 1 }))
            closeModal()


        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setProvinceObj({ ...provinceObj, [updateType]: value });
    }
    return (
        <>
            <InputText type="text" defaultValue={provinceObj.first_name} updateType="name" containerStyle="mt-4" value labelTitle="Tên tỉnh" updateFormValue={updateFormValue} />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewProvince()}>Save</button>
            </div>
        </>
    )
}

export default AddProvinceModalBody