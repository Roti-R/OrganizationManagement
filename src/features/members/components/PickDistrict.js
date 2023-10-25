import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SelectBox from '../../../components/Input/SelectBox'


export const PickDistrict = ({ updateType, updateFormValue }) => {
    const [selectedProv, setSelectedProv] = useState(null)
    const { orgs } = useSelector(state => state.org)
    const provs = orgs.filter(o => o.type === 'tinh')
    const districts = orgs.filter(o => o.parentID === selectedProv)

    const handleSelectProvince = (value) => {
        setSelectedProv(value);
    }

    const updateValue = (value) => {
        updateFormValue({ updateType, value: value })
    }
    return (
        <>
            <SelectBox
                options={provs}
                labelTitle="Chọn tỉnh"
                placeholder="Chọn tỉnh"
                containerStyle="w-full mt-4"
                labelStyle=""
                updateFormValue={handleSelectProvince}
                nameKey='orgID'
            />
            <SelectBox
                options={districts}
                labelTitle="Chọn huyện"
                placeholder="Chọn huyện"
                containerStyle="w-full mt-4"
                labelStyle=""
                updateFormValue={updateValue}
                nameKey='orgID'
            />
        </>

    )
}
