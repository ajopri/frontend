import Sidebar from '@components/Sidebar'
import Head from 'next/head'

export default function Mainlayout({ children, pageTitle }) {
    return (
        <>
            <Head>
                <title>E-Services | {pageTitle}</title>
                <meta name="description" content="E-Services Maha Chemicals" />
            </Head>
            {/* Main */}
            <div className="flex w-screen min-h-screen bg-white">
                <Sidebar />
                {children}
            </div>
        </>
    )
}
