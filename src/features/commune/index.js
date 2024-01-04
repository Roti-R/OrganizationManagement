import { useDispatch, useSelector } from 'react-redux';

import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../utils/globalConstantUtil';
import { Link } from 'react-router-dom';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import React from 'react'
import SearchBar from '../../components/Input/SearchBar';
import SelectBox from '../../components/Input/SelectBox';
import TitleCard from '../../components/Cards/TitleCard';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { getMember } from '../members/memberSlice';
import { getOrganization } from '../transactions/OrganizationSlice';
import { openModal } from '../common/modalSlice';
import { setSelectedDistrict } from './SelectedDistrictSlice';
import { useEffect } from 'react';
import { useState } from 'react';

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
    const dispatch = useDispatch();
    const { orgs, isLoading } = useSelector(state => state.org)
    const [selectedProvince, setSelectedProvince] = useState(null)
    const provs = orgs.filter(org => org.type === 'tinh')
    const districts = orgs.filter(org => org.parentID === selectedProvince)
    const [searchText, setSearchText] = useState("")

    console.log(selectedProvince);
    useEffect(() => {
        dispatch(getOrganization())
    }, [])

    const handleSearchChange = (searchText) => {
        setSearchText(searchText)
        applySearch(searchText)
    }

    const AddNewDistrictModal = () => {
        dispatch(openModal({ title: 'Thêm đơn vị xã', bodyType: MODAL_BODY_TYPES.COMMUNE_ADD_NEW }))
    }

    const handleSelectProvince = (value) => {
        setSelectedProvince(value);
    };

    const handleSelectDistrict = value => {
        dispatch(setSelectedDistrict(value))
    }




    return (
        <div className="inline-block float-right ">
            <SelectBox
                options={provs}
                labelTitle="Period"
                placeholder="Chọn tỉnh"
                containerStyle="w-72 mr-4"
                labelStyle="hidden"
                updateFormValue={handleSelectProvince}
                nameKey='orgID'
            />
            <SelectBox
                options={districts}
                labelTitle="Period"
                placeholder="Chọn huyện"
                containerStyle="w-72 mr-4"
                labelStyle="hidden"
                updateFormValue={handleSelectDistrict}
                nameKey='orgID'
            />

            <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full" onClick={() => AddNewDistrictModal()}>Thêm đơn vị xã</button>
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={handleSearchChange} />
        </div>
    )
}

const Commune = () => {

    const dispatch = useDispatch()
    const { selectedDistrict } = useSelector(state => state.selectedDistrict)
    const { orgs, isLoading } = useSelector(state => state.org)
    const communes = orgs.filter(org => org.parentID === selectedDistrict)
    const { members } = useSelector(state => state.member)
    const [searchText, setSearchText] = useState("")


    useEffect(() => {
        dispatch(getOrganization())
        dispatch(getMember())
    }, [])

    const countChild = (orgId) => {
        return orgs.filter(o => o.parentID === orgId).length
    }

    const countMember = (orgId) => {
        return members.filter(m => m.currentOrganizationID === orgId).length
    }

    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')

    const deleteCurrentOrganization = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Xóa hội này cũng sẽ xóa các hội trực thuộc nó, bạn có muốn xóa không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ORGANIZATION_DELETE, index: index }
        }))
    }

    const applySearch = (searchText) => {
        setSearchText(searchText)
    }
    return (
        <>
            <TitleCard title="Danh sách đơn vị xã" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th>Tên huyện</th>
                                <th>Số hội con</th>
                                <th>Số thành viên</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                communes.filter((t) => { return searchText === "" || t.name.toLowerCase().includes(searchText.toLowerCase()) }).map((l, k) => {
                                    return (
                                        <tr key={l.orgID}>
                                            <td className="text-center hover:bg-gray-700 cursor-point">
                                                <Link to={`id=${l.orgID}`} className="text-center">

                                                    {l.name}
                                                </Link>
                                            </td>
                                            <td className="text-center">{countChild(l.orgID)}</td>
                                            <td className='text-center'>{countMember(l.orgID)}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentOrganization(l.orgID)}><TrashIcon className="w-5" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default Commune;