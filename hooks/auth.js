import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Axios from 'axios'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    // GET CSRF
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    //Register
    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    //set Token SAP
    const sapToken = async ({ setErrors, setStatus }) => {
        const sapURL = process.env.NEXT_PUBLIC_SAP_API_URL
        const usernameSAP = process.env.NEXT_PUBLIC_SAP_USERNAME
        const passwordSAP = process.env.NEXT_PUBLIC_SAP_PASSWORD
        const sapAPI = Axios.create({ baseURL: sapURL })

        setErrors([])
        setStatus(null)

        sapAPI
            .post('/Auth/Login', {
                userName: usernameSAP,
                password: passwordSAP,
            })
            .then(res => {
                Cookies.set('sap_token', res.data.token, res.data.expire)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
                logout()
            })
    }

    // Login
    const login = async ({ setErrors, setStatus, setIsLoading, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        if(!props.isAdmin){
            axios
                .post('/login', props)
                .then(() => mutate())
                .catch(error => {
                    if (error.response.status !== 422) throw error
    
                    setErrors(Object.values(error.response.data.errors).flat())
    
                    setIsLoading(false)
                })
        } else {
            axios
                .post('/login/admin', props)
                .then(() => mutate())
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())

                    setIsLoading(false)
                })
        }
    }

    //Forgot password
    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    //Reset password
    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status != 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    //Verify email
    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    //activate account
    const activateAccount = async ({
        setErrors,
        setStatus,
        setIsLoading,
        ...props
    }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/api/activate-account', {
                token: router.query.token,
                ...props,
            })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status != 422) throw error
                setErrors(Object.values(error.response.data).flat())
                setIsLoading(false)
            })
    }

    //Logout
    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        sapToken,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        activateAccount,
        logout,
    }
}
