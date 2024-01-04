import { useRef, useState } from 'react'

import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import LandingIntro from './LandingIntro'
import { Link } from 'react-router-dom'
import userApi from '../../api/userApi'

function Login() {

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    //Check user credentials
    const checkCredential = async () => {
        let response = await userApi.checkCredentials(loginObj);
        return response;
    }

    const submitForm = (e) => {
        var myData;
        e.preventDefault()
        setErrorMessage("")
        if (loginObj.emailId.trim() === "") return setErrorMessage("Hãy nhập tài khoản")
        if (loginObj.password.trim() === "") return setErrorMessage("Hãy nhập mật khẩu")
        checkCredential().then(res => {
            if (res.data.success === false) {
                return setErrorMessage("Tài khoản và mật khẩu không hợp lệ")
            }
            else if (res.data.success === true) {
                setLoading(true)
                // Call API to check user credentials and save token in localstorage
                localStorage.setItem("token", res.data.data)
                console.log(res.data.data);
                setLoading(false)
                window.location.href = '/app/welcome'
            }
        })
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText defaultValue={loginObj.emailId} type="emailId" updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login