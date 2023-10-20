import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { useEffect } from 'react';
import SearchBar from '../../components/Input/SearchBar';
import TitleCard from '../../components/Cards/TitleCard';
import SelectBox from '../../components/Input/SelectBox';
import { getOrganization } from '../transactions/OrganizationSlice';
import { setSelectedProvince } from './SelectedProvSlice';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../utils/globalConstantUtil';


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
    const dispatch = useDispatch();
    const { orgs, isLoading } = useSelector(state => state.org)
    const provs = orgs.filter(org => org.type === 'tinh')
    const [searchText, setSearchText] = useState("")


    useEffect(() => {
        dispatch(getOrganization())
    }, [])


    useEffect(() => {
        applySearch(searchText)
    }, [searchText])

    const AddNewDistrictModal = () => {
        dispatch(openModal({ title: 'Thêm đơn vị huyện', bodyType: MODAL_BODY_TYPES.DISTRICT_ADD_NEW }))
    }

    const handleProvinceSelect = (province) => {
        console.log('Da chay province select');
        dispatch(setSelectedProvince(province))
    };

    return (
        <div className="inline-block float-right ">
            <SelectBox
                options={provs}
                labelTitle="Period"
                placeholder="Chọn tỉnh"
                containerStyle="w-72 mr-4"
                labelStyle="hidden"
                updateFormValue={handleProvinceSelect}
                nameKey='orgID'
            />

            <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full" onClick={() => AddNewDistrictModal()}>Thêm đơn vị huyện</button>
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
        </div>
    )
}



const District = () => {
    const dispatch = useDispatch();

    const { selectedProvince } = useSelector(state => state.selectedProv)
    const { orgs, isLoading } = useSelector(state => state.org);
    const districtOrg = orgs.filter(org => org.parentID === selectedProvince)
    const [searchText, setSearchText] = useState("");
    const [filterdSearchDistrictOrg, setFilterSearchDistrictOrg] = useState(districtOrg);

    useEffect(() => {
        applySearch(searchText)
    }, [searchText, orgs])

    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')

    const applySearch = (searchText) => {
        const filteredSearch = districtOrg.filter(prov => searchText === "" || prov.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilterSearchDistrictOrg(filteredSearch);
    }

    const deleteCurrentOrganization = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Xóa hội này cũng sẽ xóa các hội trực thuộc nó, bạn có muốn xóa không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ORGANIZATION_DELETE, index: index }
        }))
    }
    return (
        <>
            <TitleCard title="Danh sách đơn vị huyện" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th>Tên huyện</th>
                                <th>Người quản lý</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterdSearchDistrictOrg.map((l, k) => {
                                    return (
                                        <tr key={l.orgID}>
                                            <td className="text-center">
                                                {l.name}
                                            </td>

                                            <td className="text-center">{l.type}</td>
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

export default District;