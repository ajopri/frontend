import Authlayout from '@components/Layouts/AuthLayout'
import Primarybutton from '@components/Button/PrimaryButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Input from '@components/Inputs/Input'
import { useEffect, useState } from 'react'
import Authsessionstatus from '@components/Layouts/AuthSessionStatus'
import Authvalidationerrors from '@components/Layouts/AuthValidationErrors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/hooks/auth'

export default function Login() {
    const router = useRouter()

    // States
    const [isAdmin, setIsAdmin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Auth hook
    const { login, sapToken } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/admin/dashboard',
    })

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }

        if(router.query.admin === 'admin') setIsAdmin(true)
    })

    // Form submit
    const submitForm = async event => {
        event.preventDefault()
        setIsLoading(true)
        login({ email, password, isAdmin, setErrors, setStatus, setIsLoading })
        sapToken({ setErrors, setStatus })
    }

    return (
        <Authlayout pageTitle="Login">
            {/* content */}
            <div className="flex flex-col px-10 w-96 sm:px-0">
                {/* title */}
                <div className="mb-8 text-left">
                    <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
                        Welcome to E-services
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Please sign in to continue
                    </p>
                </div>
                {/* Form */}
                <div className="sm:w-[21rem] w-fit">
                    {/* Session Status */}
                    <Authsessionstatus className="mb-4" status={status} />

                    {/* Validation Errors */}
                    <Authvalidationerrors errors={errors} />

                    {/* Login form */}
                    <form className="mb-4" onSubmit={submitForm}>
                        <div className="mb-3">
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                className="text-base"
                                required
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label
                                        className="block font-light text-gray-500"
                                        htmlFor="remember">
                                        <input
                                            className="ml-2 leading-tight"
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                        />
                                        <span className="text-sm">
                                            {' '}
                                            Remember me{' '}
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    <a
                                        className="text-sm font-light text-indigo-500 hover:text-indigo-600 hover:font-normal"
                                        href="#password-request">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <Primarybutton>
                                {!isLoading ? (
                                    'Log In as administrator'
                                ) : (
                                    <span>
                                        <FontAwesomeIcon icon={faFan} spin />{' '}
                                        Loading...
                                    </span>
                                )}
                            </Primarybutton>
                        </div>
                        <p className="text-xs text-left text-gray-400">
                            <span>
                                This portal is reserved for MahaChem customers
                                only.{' '}
                                <Link href="/" passHref>
                                    <span className="font-light text-indigo-500 cursor-pointer focus:text-indigo-600 focus:outline-none focus:underline hover:font-normal">
                                        Learn more
                                    </span>
                                </Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            {/* end content */}
        </Authlayout>
    )
}
