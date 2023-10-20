import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import organizationApi from "../../api/OrganizationAPI"
import { data } from "autoprefixer"
import { openModal } from "../common/modalSlice"
import { getOrganization } from "./OrganizationSlice"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {


    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    console.log("Day la TopSideButton");

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
    const provs = orgs.filter(org => org.type === 'tinh');
    const [filteredProvs, setFilteredProvs] = useState(provs);
    const [loading, setLoading] = useState(true);


    console.log("Day la transaction");


    useEffect(() => {
        dispatch(getOrganization()).then(
            setFilteredProvs([...provs])
        )
    }, []
    )
    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')

    const deleteCurrentOrganization = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Xóa hội này cũng sẽ xóa các hội trực thuộc nó, bạn có muốn xóa không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ORGANIZATION_DELETE, index: index }
        }))
    }

    const applySearch = (searchText) => {
        console.log("Đã chạy vào hàm apply Search");
        console.log("Chuỗi searh là : " + searchText);
        const filteredSearch = provs.filter((t) => { return searchText === "" || t.name.toLowerCase().includes(searchText.toLowerCase()) });
        setFilteredProvs(filteredSearch);
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
                                <th>Người quản lý</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProvs.map((l, k) => {
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


export default Transactions