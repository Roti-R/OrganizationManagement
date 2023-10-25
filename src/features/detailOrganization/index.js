import React from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { useParams, useSearchParams } from 'react-router-dom'
import { ORGANIZATION_TYPE } from '../../utils/globalConstantUtil'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrganization } from '../transactions/OrganizationSlice'
import { useState } from 'react'
import DashboardStats from '../dashboard/components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import User from '@heroicons/react/24/outline/UserIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { getMember, updateMember } from '../members/memberSlice'
import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { openModal } from '../common/modalSlice'


export const DetailOrganization = () => {

    const dispatch = useDispatch()
    const param = useParams();
    var typeInTitle = ""

    const { orgs, isLoading } = useSelector(state => state.org)
    const { members } = useSelector(state => state.member)
    const org = orgs.find(o => o.orgID === param.id)
    const memberList = members.filter(mem => mem.currentOrganizationID === param.id)
    switch (param.type) {
        case ORGANIZATION_TYPE.PROVINCE:
            typeInTitle = "tỉnh"
            break;
        case ORGANIZATION_TYPE.DISTRICT:
            typeInTitle = "huyện"
            break;
        case ORGANIZATION_TYPE.COMMUNE:
            typeInTitle = "xã"
            break;
        default:
            break;
    }
    console.log(org);
    useEffect(() => {
        dispatch(getOrganization());
        dispatch(getMember());
    }, [])

    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')


    const deleteCurrentMember = (memberID, member) => {
        let updateMember = { ...member, currentOrganizationID: null }
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Bạn có chắc muốn xóa thành viên này khỏi hội không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.MEMBER_OUT_ORGANIZATION, index: memberID, updateObject: updateMember }
        }))

    }

    const setMemberToManager = () => {

    }

    const AddNewMemberToOrg = () => {
        dispatch(openModal({
            title: 'Thêm thành viên vào hội', bodyType: MODAL_BODY_TYPES.MEMBER_ADD_ORGANIZATION,
            extraObject: { index: param.id }
        }))
    }
    return (
        <>
            <TitleCard title={`Chi tiết ${typeInTitle} ${org ? org.name : ""}`} topMargin="mt-2">

                <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 '>
                    <DashboardStats containerStyle="bg-base-200" title="Số thành viên" value={memberList.length} icon={<UserGroupIcon className='w-8 h-8' />} description="" />
                    <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full self-center" onClick={() => AddNewMemberToOrg()}>Thêm thành viên</button>
                    <DashboardStats containerStyle="col-start-3 col-end-4 bg-base-200" title="Số quản lý" value={10} icon={<UserGroupIcon className='w-8 h-8' />} description="" />
                </div>
                <div className='grid lg:grid-cols-2 mt-10 md:grid-cols-1 grid-cols-1 gap-6'>
                    <table className="table w-full">
                        {/* head */}
                        <thead className=''>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Xóa khỏi hội</th>
                                <th>Đặt làm quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                memberList.map((m, index) => {
                                    return (
                                        <tr key={m.memberID}>
                                            <td>{index + 1}</td>
                                            <td>{m.name}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentMember(m.memberID, m)}><TrashIcon className="w-5" /></button></td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => setMemberToManager(m.memberID)}><ArrowUpTrayIcon className="w-5" /></button></td>
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

export default DetailOrganization