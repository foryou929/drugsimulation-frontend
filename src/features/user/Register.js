import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import LandingIntro from "./LandingIntro";
import md5 from 'md5'
import query from '../../utils/query';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function Register() {
    const { t } = useTranslation();
    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        password_confirm: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (registerObj.name.trim() === "") return setErrorMessage(i18next.t('name_is_required'))
        if (registerObj.emailId.trim().length == 0) return setErrorMessage(i18next.t('email_is_required'))
        if (!emailRegex.test(registerObj.emailId)) return setErrorMessage(i18next.t('not_valid_email_format'))
        if (registerObj.password === "") return setErrorMessage(i18next.t('password_is_required'))
        if (registerObj.password.length < 8) return setErrorMessage(i18next.t('password_length_validation'))
        if (registerObj.password != registerObj.password_confirm) return setErrorMessage(i18next.t('password_confirm_error'))
        else {
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            query.post('/register', { name: registerObj.name, pwd: md5(registerObj.password), email: registerObj.emailId },
                (data) => {
                    setLoading(false)
                },
                (err) => {
                    setLoading(true)
                }
            )
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-pic bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100">
                    <div className=''>
                        <LandingIntro page={'register'} />
                    </div>
                    <div className='py-24 px-10'>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 mr-2' src='/logo.png' alt='logo' />
                            <h1 className='text-3xl text-center font-bold'>{t('app_title')}</h1>
                        </div>
                        <h2 className='text-2xl font-semibold my-2 text-center'>{t('register')}</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle={t('name')} updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle={t('email')} updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle={t('pwd')} updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.password} type="password" updateType="password_confirm" containerStyle="mt-4" labelTitle={t('pwd_confirm')} updateFormValue={updateFormValue} />

                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>{t('register')}</button>

                            <div className='text-center mt-4'>
                                {
                                    t('to_login')
                                }
                                <Link to="/login">
                                    <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 text-red-500 animate-pulse font-bold">
                                        {
                                            t('login')
                                        }
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register