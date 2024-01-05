import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import { Link } from "react-router-dom"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import SearchBar from "../../components/Input/SearchBar"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { data } from "autoprefixer"
import { getMember } from '../members/memberSlice'
import { getOrganization } from "./OrganizationSlice"
import moment from "moment"
import { openModal } from "../common/modalSlice"
import organizationApi from "../../api/OrganizationAPI"
import { showNotification } from "../common/headerSlice"

const TopSideButtons = ({ applySearch }) => {


    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const handleSearchChange = (searchText) => {
        setSearchText(searchText)
        applySearch(searchText)
    }

    const AddNewProvinceModal = () => {
        dispatch(openModal({ title: 'Thêm đơn vị tỉnh', bodyType: MODAL_BODY_TYPES.PROVINCE_ADD_NEW }))
    }




    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full" onClick={() => AddNewProvinceModal()}>Thêm đơn vị tỉnh</button>
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={handleSearchChange} />
        </div>
    )


}




function Transactions() {
    const dispatch = useDispatch();
    const { orgs, isLoading } = useSelector(state => state.org)
    const { members } = useSelector(state => state.member)
    const provs = orgs.filter(org => org.type === 'tinh');
    const [filteredProvs, setFilteredProvs] = useState([]);

    useEffect(() => {
        dispatch(getOrganization())
        dispatch(getMember())
    }, [])

    useEffect(() => {
        setFilteredProvs(provs)
    }, [orgs])

    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')

    const countChild = (orgId) => {
        return orgs.filter(o => o.parentID === orgId).length
    }

    const countMember = (orgId) => {
        return members.filter(m => m.currentOrganizationID === orgId).length
    }
    const deleteCurrentOrganization = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Xóa hội này sẽ xóa các hội trực thuộc nó, xóa các thành viên khỏi hội, bạn có muốn xóa không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ORGANIZATION_DELETE, index: index }
        }))
    }

    const applySearch = (searchText) => {
        const filteredSearch = provs.filter((t) => { return searchText === "" || t.name.toLowerCase().includes(searchText.toLowerCase()) });
        setFilteredProvs(filteredSearch)
    }

    return (
        <>
            <TitleCard title="Danh sách đơn vị tỉnh" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th>Tên tỉnh</th>
                                <th>Số hội con</th>
                                <th>Số thành viên</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProvs.map((l, k) => {
                                    return (
                                        <tr key={l.orgID} className="" >
                                            <td className="text-center hover:bg-gray-700 cursor-point">
                                                <Link to={`id=${l.orgID}`} className="text-center">

                                                    {l.name}
                                                </Link>

                                            </td>
                                            <td className='text-center'>{countChild(l.orgID)}</td>
                                            <td className='text-center'>{countMember(l.orgID)}</td>
                                            <td className=""><button className="btn btn-square btn-ghost " onClick={() => deleteCurrentOrganization(l.orgID)}><TrashIcon className="w-5" /></button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard >
        </>
    )
}


export default Transactions