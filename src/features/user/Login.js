import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import LandingIntro from "./LandingIntro";
import md5 from 'md5'
import query from '../../utils/query'
import { login } from '../common/userSlice'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useLocation } from 'react-router-dom';
import checkAuth from '../../app/auth'
import { NotificationManager } from 'react-notifications'

function Login() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const status = searchParams.get('status');
        const token = searchParams.get('token');

        if (status == 'success') {
            localStorage.setItem("token", token)
            checkAuth();
            query.get('/login', (data) => {
                dispatch(login(data.user))
                NotificationManager.success(i18next.t('user_login_succeeded'), i18next.t('success'));
                setTimeout(() => {
                    window.location.href = '/app/calendar'
                }, 1000)
            })
        }
        if (status == 'user_not_exist') {
            NotificationManager.error(i18next.t('user_not_exist'), i18next.t('error'));
        }
    }, [location])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = (e) => {
        console.log(e);
        e.preventDefault()
        setErrorMessage("")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (loginObj.emailId.trim().length == 0) return setErrorMessage(i18next.t('email_is_required'))
        if (!emailRegex.test(loginObj.emailId)) return setErrorMessage(i18next.t('not_valid_email_format'))
        if (loginObj.password === "") return setErrorMessage(i18next.t('password_is_required'))
        else {
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            query.post('/login', { pwd: md5(loginObj.password), email: loginObj.emailId },
                (data) => {
                    localStorage.setItem("token", data.token)
                    dispatch(login(data.user))
                    setLoading(false)
                    setTimeout(() => {
                        window.location.href = '/app/calendar'
                    }, 1000)
                },
                (err) => {
                    setLoading(true)
                }
            )
        }
    }

    const loginWithGoogle = (e) => {
        e.preventDefault();
        window.location.href = process.env.REACT_APP_URL + "/api/loginWithGoogle";
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-pic bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro page={'login'} />
                    </div>
                    <div className='py-24 px-10'>
                        <div className='flex items-center'>
                            <img className='w-10 h-10 mr-2' src='/logo.png' alt='logo' />
                            <h1 className='text-3xl text-center font-bold'>{t('app_title')}</h1>
                        </div>
                        <h2 className='text-2xl font-semibold my-2 text-center'>{t('login')}</h2>
                        <form onSubmit={submitForm}>

                            <div className="mb-4">

                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle={t('email')} updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle={t('pwd')} updateFormValue={updateFormValue} />

                            </div>

                            {/* <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div> */}

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className="btn mt-2 w-full btn-primary">
                                {t('login')}
                            </button>

                            <button type="button" className="btn mt-2 w-full btn-primary" onClick={loginWithGoogle}>
                                <img src="google.svg" />
                                {t('login_with_google')}
                            </button>

                            <div className='text-center mt-4'>
                                {
                                    t('to_register')
                                }
                                <Link to="/register">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200 text-red-500 animate-pulse font-bold">
                                        {
                                            t('register')
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

export default Login