import Head from "next/head";
import Countrydropdown from "../CountryDropdown";
import Mahalogo from "../MahaLogo";

export default function Authlayout({children, pageTitle}) {

    return (
      <>
        <Head>
          <title>E-Services | {pageTitle}</title>
          <meta name="description" content="E-Services Maha Chemicals" />
        </Head>
        <div className="flex min-h-screen bg-maha-500">
          {/* Logo */}
          <div className="flex items-center justify-center w-0 sm:w-5/12">
            <Mahalogo width={400} height={100} />
          </div>

          {/* Form */}
          <div className="sm:w-7/12 w-full bg-white sm:rounded-tl-[3.5rem] sm:rounded-bl-[3.5rem] rounded-none flex flex-col items-center justify-center">
            <div className="absolute top-2 right-5">
                <Countrydropdown />
            </div>
            {children}
          </div>
        </div>
      </>
    )
}
