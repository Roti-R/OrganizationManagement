import React from 'react'
import { useSelector } from 'react-redux'
import SelectBox from '../../../components/Input/SelectBox'

export const PickProvince = ({ updateType, updateFormValue }) => {
    const { orgs } = useSelector(state => state.org)
    const provs = orgs.filter(o => o.type === 'tinh')

    const updateValue = (value) => {
        updateFormValue({ updateType, value: value })
    }
    return (
        <SelectBox
            options={provs}
            labelTitle="Chọn tỉnh"
            placeholder="Chọn tỉnh"
            containerStyle="w-full mt-4"
            labelStyle=""
            updateFormValue={updateValue}
            nameKey='orgID'
        />
    )
}
