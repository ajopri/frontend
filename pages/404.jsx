import Image from 'next/image'
import { useRouter } from 'next/router'
import NotFound from '../public/error-and-page-not-found.svg'

export default function Custom404() {
    const router = useRouter()
    return (
        <div className="bg-gray-100 h-screen justify-center">
            <center className="pt-28 m-auto">
                <div className="relative animate-bounce">
                    <Image src={NotFound} width={200} height={300} />
                </div>
                <div className=" tracking-widest">
                    <span className="text-gray-500 text-6xl block">
                        <span>4 0 4</span>
                    </span>
                    <span className="text-gray-500 text-xl">
                        Sorry, We couldn't find what you are looking for!
                    </span>
                </div>
            </center>
            <center className="mt-6">
                <button
                    onClick={() => router.back()}
                    className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
                    Go back{' '}
                </button>
            </center>
        </div>
    )
}
