import { useDispatch } from "react-redux";
import { useState } from "react";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { createMember } from "../memberSlice";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { PickProvince } from "./PickProvince";
import { PickCommune } from "./PickCommune";
import { PickDistrict } from "./PickDistrict";

const INITIAL_MEMBER_OBJ = {
    name: '',
    address: '',
    phoneNumber: '',
    currentOrganizationID: null,
    birthDate: '',
}

const AddMemberModalBody = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("")
    const [memberObj, setmemberObj] = useState(INITIAL_MEMBER_OBJ)
    const [isAddToOrg, setIsAddToOrg] = useState(false)
    const [activeButton, setActiveButton] = useState(0)
    console.log(memberObj);

    const saveNewMember = () => {
        const regexTel = /^\d{10}$/;
        if (memberObj.name.trim() === "") return setErrorMessage("Hãy điền tên thành viên")
        else if (memberObj.phoneNumber !== '' && !regexTel.test(memberObj.phoneNumber)) return setErrorMessage("Hãy nhập đúng định dạng số điện thoại")
        else if (memberObj.currentOrganizationID === "PLACEHOLDER") return setErrorMessage("Hãy hoàn thành việc chọn hội")
        else {
            //Call API to Add Province Organization
            dispatch(createMember(memberObj)).unwrap()
                .then(res => {
                    dispatch(showNotification({ message: "Thêm thành viên mới thành công", status: 1 }))
                    closeModal();
                })
                .catch(err => {
                    setErrorMessage(err.error.errors[0].errorMessage);
                })


        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setmemberObj({ ...memberObj, [updateType]: value });
    }

    const handleAddToOrgToggleChange = () => {
        setIsAddToOrg(!isAddToOrg);
    }

    const handleOrganizationType = (type) => {
        setActiveButton(type);
    }

    return (
        <>
            <InputText type="text" defaultValue={memberObj.name} updateType="name" containerStyle="mt-4" value labelTitle="Tên thành viên" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={memberObj.address} updateType="address" containerStyle="mt-4" value labelTitle="Địa chỉ" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={memberObj.phoneNumber} updateType="phoneNumber" containerStyle="mt-4" value labelTitle="SĐT" updateFormValue={updateFormValue} />
            <InputText type="date" updateType="birthDate" containerStyle="mt-4" value labelTitle="Ngày sinh" updateFormValue={updateFormValue} />

            <div className="form-control w-full mt-4">
                <label className="cursor-pointer label">
                    <span className="label-text">Thêm vào hội</span>
                    <input type="checkbox" className="toggle toggle-primary toggle-lg" checked={isAddToOrg} onChange={handleAddToOrgToggleChange} />
                </label>
            </div>

            {
                isAddToOrg && (
                    <div className="btn-group w-full mt-4">
                        <input type="radio" name="options" data-title="Tỉnh" className="btn w-1/3" onClick={() => handleOrganizationType(1)} />
                        <input type="radio" name="options" data-title="Huyện" className="btn w-1/3" onClick={() => handleOrganizationType(2)} />
                        <input type="radio" name="options" data-title="Xã" className="btn w-1/3" onClick={() => handleOrganizationType(3)} />
                    </div>

                )


            }

            {
                isAddToOrg && {
                    1: <PickProvince updateType="currentOrganizationID" updateFormValue={updateFormValue} />,
                    2: <PickDistrict updateType="currentOrganizationID" updateFormValue={updateFormValue} />,
                    3: <PickCommune updateType="currentOrganizationID" updateFormValue={updateFormValue} />,
                    0: <div></div>
                }[activeButton]
            }








            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>


            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewMember()}>Save</button>
            </div>
        </>
    )
}
export default AddMemberModalBody;