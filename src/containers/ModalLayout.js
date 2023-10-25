import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddProvinceModalBody from '../features/transactions/components/AddProvinceModalBody'
import AddDistrictModalBody from '../features/district/components/AddDistrictModalBody'
import AddCommuneModalBody from '../features/commune/components/AddCommuneModalBody'
import AddMemberModalBody from '../features/members/components/addMemberModalBody'
import AddMemberToOrg from '../features/detailOrganization/components/AddMemberToOrg'


function ModalLayout() {


    const { isOpen, bodyType, size, extraObject, title } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return (
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                    {/* Loading modal body according to different modal type */}
                    {
                        {

                            [MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddLeadModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.PROVINCE_ADD_NEW]: <AddProvinceModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.DISTRICT_ADD_NEW]: <AddDistrictModalBody closeModal={close} extraObject={extraObject} />,
                            [MODAL_BODY_TYPES.CONFIRMATION]: <ConfirmationModalBody extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.COMMUNE_ADD_NEW]: <AddCommuneModalBody extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.MEMBER_ADD_NEW]: <AddMemberModalBody extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.MEMBER_ADD_ORGANIZATION]: <AddMemberToOrg extraObject={extraObject} closeModal={close} />,
                            [MODAL_BODY_TYPES.DEFAULT]: <div></div>
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    )
}

export default ModalLayout