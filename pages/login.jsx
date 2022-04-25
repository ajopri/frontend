import Authlayout from "@components/Layouts/AuthLayout";
import Primarybutton from "@components/Button/PrimaryButton";
import Link from "next/link";
import Router from "next/router";

export default function Login() {
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
                    <form className="mb-4">
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
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
                            <Primarybutton onClick={() => Router.push('/dashboard')}>
                                sign in
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
