import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { getMember } from "./memberSlice"
import { formatDateTime } from "./util"
import { getOrganization } from "../transactions/OrganizationSlice"
import { Await } from "react-router-dom"

const sourceImg = "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/26/ngo-ngang-voi-ve-dep-cua-hot-girl-anh-the-chua-tron-18-docx-1622043349706.jpeg"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewMemberModal = () => {
        dispatch(openModal({ title: 'Thêm thành viên', bodyType: MODAL_BODY_TYPES.MEMBER_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewMemberModal()}>Thêm thành viên</button>
        </div>
    )
}



const Members = () => {

    const dispatch = useDispatch()
    const { members, isLoading } = useSelector(state => state.member)
    const { orgs } = useSelector(state => state.org)
    useEffect(() => {
        dispatch(getOrganization())
        dispatch(getMember())
    }, [])



    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')
    const getMemberOrganization = (currentOrganization) => {
        if (orgs) {
            return orgs.find(org => org.orgID === currentOrganization).name;

        }
    }

    const deleteCurrentMember = (index) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Bạn có chắc muốn xóa thành viên này không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.MEMBER_DELETE, index: index }
        }))
    }


    return (
        <>
            <TitleCard title="Thành viên" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Ngày tham gia</th>
                                <th>Trạng thái</th>
                                <th>Hội</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.map((l, k) => {
                                    return (
                                        <tr key={l.memberID}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={sourceImg} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.name}</div>
                                                        <div className="text-sm opacity-50">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{formatDateTime(l.joinDate)}</td>

                                            <td>
                                                {
                                                    l.currentOrganizationID === null ? <div className="badge">Chưa có hội</div>
                                                        : <div className="badge badge-secondary">Đã có hội</div>
                                                }
                                            </td>
                                            <td>{l.currentOrganizationID === null ? "" : getMemberOrganization(l.currentOrganizationID)}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentMember(l.memberID)}><TrashIcon className="w-5" /></button></td>
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
export default Members