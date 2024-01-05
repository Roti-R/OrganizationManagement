import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { getMember, updateMember } from '../members/memberSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import DashboardStats from '../dashboard/components/DashboardStats'
import HandRaisedIcon from '@heroicons/react/24/outline/HandRaisedIcon'
import { ORGANIZATION_TYPE } from '../../utils/globalConstantUtil'
import React from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import User from '@heroicons/react/24/outline/UserIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import { getManagerById } from './managerSlice'
import { getOrganization } from '../transactions/OrganizationSlice'
import { openModal } from '../common/modalSlice'
import organizationApi from '../../api/OrganizationAPI'
import { useEffect } from 'react'
import { useState } from 'react'

export const DetailOrganization = () => {

    const dispatch = useDispatch()
    const param = useParams();
    var typeInTitle = ""

    const { orgs, isLoading } = useSelector(state => state.org)
    const { members } = useSelector(state => state.member)
    const { managers } = useSelector(state => state.manager)
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
    useEffect(() => {
        dispatch(getOrganization());
        dispatch(getMember());
        dispatch(getManagerById(param.id));
    }, [])

    isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')


    const deleteCurrentMember = (memberID, member) => {
        let updateMember = { ...member, currentOrganizationID: null }
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Bạn có chắc muốn xóa thành viên này khỏi hội không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.MEMBER_OUT_ORGANIZATION, index: memberID, updateObject: updateMember }
        }))

    }

    const AddNewMemberToOrg = () => {
        dispatch(openModal({
            title: 'Thêm thành viên vào hội', bodyType: MODAL_BODY_TYPES.MEMBER_ADD_ORGANIZATION,
            extraObject: { index: param.id }
        }))
    }

    const addManager = () => {
        dispatch(openModal({
            title: 'Cấp quyền quản lý cho thành viên', bodyType: MODAL_BODY_TYPES.MANAGER_ADD_NEW,
            extraObject: { index: param.id }
        }))
    }

    const deleterManager = (managerId) => {
        dispatch(openModal({
            title: "Xác nhận", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Bạn có chắc muốn xóa quyền quản lý của thành viên này không ?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.MANAGER_DELETE, index: managerId }
        }))
    }

    const checkManagerIsMember = (managerId) => {
        return memberList.find(m => m.memberID === managerId)
    }
    return (
        <>
            <TitleCard title={`Chi tiết ${typeInTitle} ${org ? org.name : ""}`} topMargin="mt-2">

                <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 '>

                    <DashboardStats containerStyle="bg-base-200" title="Số thành viên" value={memberList.length} icon={<UserGroupIcon className='w-8 h-8' />} description="" />

                    <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full self-center" onClick={() => AddNewMemberToOrg()}>Thêm thành viên</button>

                    <DashboardStats containerStyle="col-start-3 col-end-4 bg-base-200" title="Số quản lý" value={managers.length} icon={<HandRaisedIcon className='w-8 h-8' />} description="" />

                    <button className="btn px-6 btn-sm normal-case btn-primary mr-5 rounded-full self-center" onClick={() => addManager()}>Thêm quản lý</button>

                </div>

                <div className='grid lg:grid-cols-2 mt-10 md:grid-cols-1 grid-cols-1 gap-6 grid-flow-row'>

                    <table className="table">
                        {/* head */}
                        <thead className=''>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>SĐT</th>
                                <th>Xóa khỏi hội</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                memberList.map((m, index) => {
                                    return (
                                        <tr key={m.memberID}>
                                            <td>{index + 1}</td>
                                            <td>{m.name}</td>
                                            <td>{m.phoneNumber}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentMember(m.memberID, m)}><TrashIcon className="w-5" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <table className="table w-full">
                        {/* head */}
                        <thead className=''>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Quản lý gián tiếp</th>
                                <th>Xóa quyền quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                managers.map((m, index) => {
                                    let isMember = checkManagerIsMember(m.memberID)
                                    return (
                                        <tr key={m.memberID}>
                                            <td>{index + 1}</td>
                                            <td>{m.name}</td>
                                            <td>{!isMember && <CheckIcon className='w-5' />}</td>
                                            <td><button disabled={!isMember} className="btn btn-square btn-ghost" onClick={() => deleterManager(m.memberID)}><ArrowDownTrayIcon className="w-5" /></button></td>
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