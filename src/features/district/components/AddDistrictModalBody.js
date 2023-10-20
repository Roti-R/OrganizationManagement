import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../../common/headerSlice';
import { closeModal } from '../../common/modalSlice';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import organizationApi from '../../../api/OrganizationAPI';
import { createOrganization, getOrganization } from '../../transactions/OrganizationSlice';
import SelectBox from '../../../components/Input/SelectBox';

const INITIAL_DISTRICT_OBJ = {
    parentID: '',
    name: ''
}
const AddDistrictModalBody = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("")
    const [districtObj, setDistrictObj] = useState(INITIAL_DISTRICT_OBJ)
    const { orgs } = useSelector(state => state.org)
    const provs = orgs.filter(t => t.type === 'tinh')

    useEffect(() => {
        dispatch(getOrganization())
    }, [])
    const saveNewDistrict = () => {
        if (districtObj.name.trim() === "") return setErrorMessage("Hãy điền tên huyện")
        else if (districtObj.parentID === "PLACEHOLDER") return setErrorMessage("Hãy chọn tỉnh")
        else {
            //Call API to Add Province Organization
            console.log(districtObj.parentID);
            let newDistrictObj = {
                ...districtObj,
                type: "huyen"
            }
            dispatch(createOrganization(newDistrictObj))
            dispatch(showNotification({ message: "Thêm huyện mới thành công", status: 1 }))
            closeModal()


        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setDistrictObj({ ...districtObj, [updateType]: value });
    }
    const updateProvinceValue = (value) => {
        setDistrictObj({ ...districtObj, parentID: value })
    }

    return (
        <>
            <SelectBox
                options={provs}
                labelTitle="Chọn tỉnh"
                placeholder="Chọn tỉnh"
                containerStyle="w-full mt-4"
                labelStyle=""
                updateFormValue={updateProvinceValue}
                nameKey='orgID'
            />
            <InputText type="text" defaultValue={districtObj.name} updateType="name" containerStyle="mt-4" value labelTitle="Tên tỉnh" updateFormValue={updateFormValue} />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewDistrict()}>Save</button>
            </div>
        </>
    )
}

export default AddDistrictModalBody