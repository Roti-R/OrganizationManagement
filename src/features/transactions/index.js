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
import { getOrganization } from "./ProvOrganizationSlice"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    const dispatch = useDispatch();

    const AddNewProvinceModal = () => {
        dispatch(openModal({ title: 'Thêm đơn vị tỉnh', bodyType: MODAL_BODY_TYPES.PROVINCE_ADD_NEW }))
    }
    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])


    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full" onClick={() => AddNewProvinceModal()}>Thêm đơn vị tỉnh</button>
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}


function Transactions() {

    const { provs, isLoading } = useSelector(state => state.prov)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrganization())
    }, []);

    if (isLoading) { document.body.classList.add('loading-indicator') }
    else { document.body.classList.remove('loading-indicator') }

    const deleteCurrentOrganization = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Xóa hội này cũng sẽ xóa các hội trực thuộc nó, bạn có muốn xóa không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ORGANIZATION_DELETE, index: index }
        }))
    }

    const doNothing = () => {

    }
    // const removeFilter = () => {
    //     setTrans(RECENT_TRANSACTIONS)
    // }

    // const applyFilter = (params) => {
    //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
    //     setTrans(filteredTransactions)
    // }

    // // Search according to name
    // const applySearch = (value) => {
    //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
    //     setTrans(filteredTransactions)
    // }



    return (
        <>

            <TitleCard title="Danh sách đơn vị tỉnh" topMargin="mt-2" TopSideButtons={<TopSideButtons removeFilter={doNothing} applyFilter={doNothing} applySearch={doNothing} />}>

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
                                provs.map((l, k) => {
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