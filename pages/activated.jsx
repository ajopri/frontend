import Authlayout from "@components/Layouts/AuthLayout";
import Primarybutton from "@components/PrimaryButton";
import { useRouter } from "next/router";

export default function Activated() {
    const router = useRouter();

    return (
        <Authlayout pageTitle="Activated">
            {/* content */}
            <div className="flex flex-col px-10 w-96 sm:px-0">
                {/* title */}
                <div className="mb-8 text-left">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Welcome, Lily!
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Thank you for activating your account. You may now login
                        anytime to get exclusive information and updates on
                        orders.
                    </p>
                </div>
                <div className="sm:w-[21rem] w-fit">
                    <div className="mb-6">
                        <Primarybutton onClick={() => router.push('/dashboard')}>
                            continue
                        </Primarybutton>
                    </div>
                </div>
            </div>
            {/* end content */}
        </Authlayout>
    )
}
