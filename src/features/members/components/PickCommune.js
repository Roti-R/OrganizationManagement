import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SelectBox from '../../../components/Input/SelectBox'

export const PickCommune = ({ updateType, updateFormValue }) => {
    const [selectedProv, setSelectedProv] = useState(null)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const { orgs } = useSelector(state => state.org)
    const provs = orgs.filter(o => o.type === 'tinh')
    const districts = orgs.filter(o => o.parentID === selectedProv)
    const communes = orgs.filter(o => o.parentID === selectedDistrict)

    const handleSelectProvince = (value) => {
        setSelectedProv(value);
    }

    const handleSelectDistrict = (value) => {
        setSelectedDistrict(value)
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
                updateFormValue={handleSelectDistrict}
                nameKey='orgID'
            />
            <SelectBox
                options={communes}
                labelTitle="Chọn xã"
                placeholder="Chọn xã"
                containerStyle="w-full mt-4"
                labelStyle=""
                updateFormValue={updateValue}
                nameKey='orgID'
            />


        </>
    )
}
