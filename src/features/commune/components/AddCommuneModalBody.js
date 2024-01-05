import React, { useEffect } from 'react'
import { createOrganization, getOrganization } from '../../transactions/OrganizationSlice';
import { useDispatch, useSelector } from 'react-redux'

import ErrorText from '../../../components/Typography/ErrorText';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import { closeModal } from '../../common/modalSlice';
import organizationApi from '../../../api/OrganizationAPI';
import { showNotification } from '../../common/headerSlice';
import { useState } from 'react';

const INITIAL_COMMUNE_OBJ = {
    parentID: '',
    name: ''
}
const AddCommuneModalBody = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("")
    const [communeObj, setCommuneObj] = useState(INITIAL_COMMUNE_OBJ)
    const [selectedProvince, setSelectedProvince] = useState(null)
    const { orgs } = useSelector(state => state.org)
    const provs = orgs.filter(t => t.type === 'tinh')
    const districts = orgs.filter(t => t.parentID === selectedProvince)

    console.log(communeObj);
    useEffect(() => {
        dispatch(getOrganization())
    }, [])
    const saveNewCommune = () => {
        if (communeObj.name.trim() === "") return setErrorMessage("Hãy điền tên xã")
        else if (communeObj.parentID === "PLACEHOLDER" && selectedProvince === "PLACEHOLDER") return setErrorMessage("Hãy chọn đầy đủ các trường")
        else {
            //Call API to Add Province Organization
            console.log(communeObj.parentID);
            let newCommuneObj = {
                ...communeObj,
                type: "xa"
            }
            dispatch(createOrganization(newCommuneObj))
            dispatch(showNotification({ message: "Thêm xã mới thành công", status: 1 }))
            closeModal()


        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setCommuneObj({ ...communeObj, [updateType]: value });
    }

    const updateDistrictValue = (value) => {
        setCommuneObj({ ...communeObj, parentID: value })
    }
    const updateProvinceValue = (value) => {

        setSelectedProvince(value)

    }

    return (
        <>
            <SelectBox
                options={provs}
                labelTitle="Chọn tỉnh"
                placeholder="Chọn tỉnh"
                containerStyle="w-full mt-4"
                updateFormValue={updateProvinceValue}
                nameKey='orgID'
            />
            <SelectBox
                options={districts}
                labelTitle="Chọn huyện"
                placeholder="Chọn huyện"
                containerStyle="w-full mt-4"
                updateFormValue={updateDistrictValue}
                nameKey='orgID'
            />
            <InputText type="text" defaultValue={communeObj.name} updateType="name" containerStyle="mt-4" value={communeObj.name} labelTitle="Tên xã" updateFormValue={updateFormValue} />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewCommune()}>Save</button>
            </div>
        </>
    )
}

export default AddCommuneModalBody