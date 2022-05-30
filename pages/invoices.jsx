import {
    faChevronDown,
    faEnvelope,
    faExclamationTriangle,
    faMoneyCheckAlt,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import Maintitle from '@/components/Typography/MainTitle'
import Subtitle from '@/components/Typography/SubTitle'
import Card from '@/components/Card/Card'
import useSAP from '@/lib/sap'
import Searchinput from '@/components/Inputs/SearchInput'
import Mainlayout from '@/components/Layouts/MainLayout'

const renderDue = val => (
    <span
        key={val}
        className={`${
            val === 'Open'
                ? 'text-blue-500'
                : val === 'Scheduled'
                ? 'text-maha-500'
                : 'text-gray-500'
        }  mr-1 rounded-md px-2 py-0.5 font-semibold`}>
        {val}
    </span>
)

function LinkDownload({ link, label }) {
    if (link) {
        return (
            <Link href={link} passHref>
                <span className="px-2 py-1 font-semibold text-green-700 bg-green-100 rounded cursor-pointer whitespace-nowrap">
                    <FontAwesomeIcon icon={faEnvelope} /> {label}
                </span>
            </Link>
        )
    }
}

function Account({ detail, loading }) {
    if (loading) return <p className="p-4 mx-auto">Loading...</p>
    if (!detail) return <p>No data</p>
    return (
        <>
            <div className="flex items-center justify-start">
                <div className="mr-3">
                    <ReactCountryFlag
                        countryCode={detail.currency.slice(0, 2)}
                        svg
                        cdnUrl="https://hatscripts.github.io/circle-flags/flags/"
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                        }}
                        title={detail.currency}
                    />
                </div>
                <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold uppercase text-gray-500">
                    {detail.currency} Account
                </div>
            </div>
            <div className="w-full pt-1 text-xl font-bold text-gray-800 whitespace-nowrap sm:text-2xl">
                {detail.currency.slice(0, 2)}$ {detail.payable.toLocaleString()}
            </div>
        </>
    )
}

function InvoiceDetails({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    return (
        <tr>
            <td
                colSpan={8}
                className={`${
                    !isExpanded ? 'hidden' : ''
                } bg-green-50 py-2 px-5`}>
                <div className="mx-auto w-fit rounded-sm border-[1px]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-[1px] border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                                <th className="px-3 py-2 rounded-tl-md">
                                    d/O#
                                </th>
                                <th className="px-3 py-2">item</th>
                                <th className="px-3 py-2">p/o#</th>
                                <th className="px-3 py-2">unit price</th>
                                <th className="px-3 py-2">total invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b-[1px] border-gray-200 bg-white hover:bg-gray-100">
                                    <td className="px-3 py-2 text-blue-500">
                                        {detail.itemCode}
                                    </td>
                                    <td className="px-3 py-2">
                                        {detail.itemName}
                                    </td>
                                    <td className="px-3 py-2 text-blue-500">
                                        {detail.poNumber}
                                    </td>
                                    <td className="px-3 py-2">
                                        {detail.unitPrice.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-2">
                                        {detail.lineTotal.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}

function Item({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    function renderDate(strDate) {
        const d = strDate.slice(0, 10)
        const date = new Date(d)
        const poDate = `${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }-${
            date.getMonth() < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
        }-${date.getFullYear()}`
        return <span>{poDate}</span>
    }

    function renderStatus(stat) {
        let className
        switch (stat.toLowerCase()) {
            case 'paid':
                className = 'text-green-500 bg-green-100 border-green-300'
                break
            case 'overdue':
                className = 'text-red-500 bg-red-100 border-red-300'
                break
            case 'outstanding':
                className = 'text-orange-500 bg-orange-100 border-orange-300'
                break
            default:
                className = 'text-gray-500 bg-gray-100 border-gray-300'
                break
        }

        return (
            <span
                className={`${className} mr-1 rounded-md border-[1px] px-2 py-0.5 font-semibold`}>
                {stat}
            </span>
        )
    }

    return (
        <>
            <tr key={data.itemCode} className="hover:bg-gray-100">
                <td className="px-6 py-1.5 text-left">
                    <Tooltip content="Details" placement="left">
                        <button
                            className={` inline-flex items-center rounded py-2 px-2 font-bold ${
                                isExpanded
                                    ? 'bg-green-400 text-white hover:bg-green-100 hover:text-gray-600'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-300'
                            }`}
                            onClick={handleClick}>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                transform={
                                    isExpanded ? { rotate: 180 } : { rotate: 0 }
                                }
                            />
                        </button>
                    </Tooltip>
                </td>
                <td className="px-6 py-1.5 text-left">{data.invNumber}</td>
                <td className="px-6 py-1.5 text-left">
                    {renderDate(data.issueDate)}
                </td>
                <td className="px-6 py-1.5 text-left">
                    {renderDate(data.dueDate)}
                </td>
                <td className="px-6 py-1.5 text-left">
                    {renderStatus(data.invStatus)}
                </td>
                <td className="px-6 py-1.5 text-left">
                    {renderDue(data.dueIn)}
                </td>
                <td className="px-6 py-1.5 text-left">
                    {data.amountDue.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-1.5 text-left">
                    <LinkDownload link="#" label="REQUEST INVOICE" />{' '}
                </td>
            </tr>

            <InvoiceDetails
                parentExpanded={isExpanded}
                details={data.details}
            />
        </>
    )
}

function Listinvoices({ datas, loading }) {
    if (loading) return <p className="p-4 mx-auto">Loading...</p>
    if (!datas) return <p>No data</p>
    return (
        <div className="flex h-[64vh] flex-col rounded-lg">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                invoice#
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                issue date
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                due date
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                status
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                due in
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                amount due
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                download
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {datas.map((data, idx) => (
                            <Item key={idx} data={data} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function Invoices() {
    const [openTab, setOpenTab] = useState(1)
    const [openStateTab, setOpenStateTab] = useState(null)

    const [sumOverdue, setSumOverdue] = useState(0)
    const [sumOutstanding, setSumOutstanding] = useState(0)

    const [outstandings, setOutstandings] = useState([])
    const [isLoadingOutstanding, setIsLoadingOutstanding] = useState(false)
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [filteredResults, setFilteredResults] = useState([])

    // Overdue state
    const [dataOverdue, setDataOverdue] = useState([])
    const [filteredOverdue, setFilteredOverdue] = useState([])
    // Outstanding state
    const [dataOutstanding, setDataOutstanding] = useState([])
    const [filteredOutstanding, setFilteredOutstanding] = useState([])
    // Paid state
    const [dataPaid, setDataPaid] = useState([])
    const [filteredPaid, setFilteredPaid] = useState([])

    // GET data Outstanding
    async function fetchDataOutstanding({ rcc, custgroup }) {
        setIsLoadingOutstanding(true)
        const response = await useSAP.get(`/Invoices/GetOutstandingPayables`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setOutstandings(data[0].details)
        setSumOverdue(data[0].overdue)
        setSumOutstanding(data[0].outstanding)
        setOpenStateTab(data[0].details[0].currency)
        setIsLoadingOutstanding(false)
    }

    // GET data Invoices
    async function fetchDataInvoices({ rcc, custgroup }) {
        setIsLoadingInvoice(true)
        const response = await useSAP.get(`/Invoices/GetAllInvoices`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setInvoices(data)
        setFilteredResults(data)
        // Overdue
        const overdueInvoices = data.filter(newVal =>
            newVal.invStatus.toLowerCase().includes('overdue'),
        )
        setDataOverdue(overdueInvoices)
        setFilteredOverdue(overdueInvoices)
        // Outstanding
        const outstandingInvoices = data.filter(newVal =>
            newVal.invStatus.toLowerCase().includes('outstanding'),
        )
        setDataOutstanding(outstandingInvoices)
        setFilteredOutstanding(outstandingInvoices)
        // Paid
        const paidInvoices = data.filter(newVal =>
            newVal.invStatus.toLowerCase().includes('paid'),
        )
        setDataPaid(paidInvoices)
        setFilteredPaid(paidInvoices)

        setIsLoadingInvoice(false)
    }

    useEffect(() => {
        const rcc = Cookies.get('rcc')
        const custgroup = Cookies.get('custgroup')
        fetchDataOutstanding({ rcc, custgroup })
        fetchDataInvoices({ rcc, custgroup })
    }, [])

    const searchItems = e => {
        const searchValue = e.target.value.toLowerCase()
        if (searchValue !== '') {
            const filteredData = invoices.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            const filteredDataOverdue = dataOverdue.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            const filteredDataOutstanding = dataOutstanding.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            const filteredDataPaid = dataPaid.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            setFilteredResults(filteredData)
            setFilteredOverdue(filteredDataOverdue)
            setFilteredOutstanding(filteredDataOutstanding)
            setFilteredPaid(filteredDataPaid)
        } else {
            setFilteredResults(invoices)
            setFilteredOverdue(dataOverdue)
            setFilteredOutstanding(dataOutstanding)
            setFilteredPaid(dataPaid)
        }
    }

    const profile = (
        <span>
            Summary of your credit terms, total overdue and
            <br />
            outstanding invoices
        </span>
    )
    const statement = (
        <div>
            Overall statement of accounts for orders transacted
            <br />
            in both local and US currency.
        </div>
    )

    return (
        <Mainlayout pageTitle="Invoices">
            <Maintitle title="Invoices" />
            <div className="flex gap-2">
                {/* left column */}
                <div className="flex flex-col flex-wrap w-full space-y-3 sm:w-5/6 sm:flex-nowrap">
                    <div className="flex flex-wrap space-x-3 sm:flex-nowrap">
                        <div className="w-full space-y-3 sm:w-3/5">
                            <Subtitle
                                title="Profile"
                                content={profile}
                                placement="right"
                            />
                            <div className="flex flex-wrap space-x-3 sm:flex-nowrap">
                                <div className="w-full sm:w-1/3">
                                    {/* Credit terms */}
                                    <Card additionalInnerClasses="h-[3.8rem]">
                                        <div className="flex justify-center w-full my-auto space-x-4">
                                            <span className="px-3 py-3 rounded-full bg-maha-500 bg-opacity-10 text-maha-500">
                                                <FontAwesomeIcon
                                                    icon={faMoneyCheckAlt}
                                                    size="lg"
                                                    fixedWidth
                                                />
                                            </span>
                                            <div>
                                                <div className="text-xs font-light text-gray-500">
                                                    Credit Terms
                                                </div>
                                                <div className="text-2xl font-bold">
                                                    90 days
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="w-full sm:w-2/3">
                                    {/* Overdue & Outstanding */}
                                    <Card additionalInnerClasses="h-[3.8rem]">
                                        <div className="flex items-center col-span-2 my-auto">
                                            {/* Overdue */}
                                            <div className="flex w-full justify-center space-x-4 border-r-[1px] border-gray-300">
                                                <span className="px-3 py-3 text-red-600 bg-red-100 rounded-full">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faExclamationTriangle
                                                        }
                                                        size="lg"
                                                        fixedWidth
                                                    />
                                                </span>
                                                <div>
                                                    <div className="text-xs font-light text-gray-500">
                                                        Overdue
                                                    </div>
                                                    <div className="text-2xl font-bold">
                                                        {sumOverdue}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Outstanding */}
                                            <div className="flex w-full justify-center space-x-4 border-l-[1px] border-gray-300">
                                                <span className="px-3 py-3 text-orange-600 bg-orange-100 rounded-full">
                                                    <FontAwesomeIcon
                                                        icon={faMoneyCheckAlt}
                                                        size="lg"
                                                        fixedWidth
                                                    />
                                                </span>
                                                <div>
                                                    <div className="text-xs font-light text-gray-500">
                                                        Outstanding
                                                    </div>
                                                    <div className="text-2xl font-bold">
                                                        {sumOutstanding}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="w-full space-y-3 sm:w-2/5">
                            <Subtitle
                                title="Total Outstanding Payables"
                                content="Only outstanding & overdue invoices are displayed."
                                placement="top"
                            />
                            <div className="flex flex-wrap space-x-3 sm:flex-nowrap">
                                {outstandings.map((detail, idx) => (
                                    <div key={idx} className="w-full sm:w-1/2">
                                        <Card>
                                            <Account
                                                detail={detail}
                                                loading={isLoadingOutstanding}
                                            />
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <Card additionalInnerClasses="space-y-3">
                            <div className="flex items-center justify-between">
                                <ul
                                    className="flex flex-row flex-wrap pb-2 mb-0 list-none"
                                    role="tablist">
                                    {[
                                        [1, 'All', filteredResults.length],
                                        [2, 'Overdue', filteredOverdue.length],
                                        [
                                            3,
                                            'Outstanding',
                                            filteredOutstanding.length,
                                        ],
                                        [4, 'Paid', filteredPaid.length],
                                    ].map(([idx, title, total]) => (
                                        <li
                                            key={idx}
                                            className="flex-auto -mb-px text-center last:mr-0">
                                            <a
                                                className={`block px-4 py-2 text-xs font-bold capitalize leading-normal ${
                                                    openTab === idx
                                                        ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-green-500 text-gray-700'
                                                        : 'bg-white text-gray-400'
                                                }`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setOpenTab(idx)
                                                }}
                                                data-toggle="tab"
                                                href={`#${title.toLowerCase()}`}
                                                role="tablist">
                                                {title}{' '}
                                                <span
                                                    className={`px-1 rounded ${
                                                        openTab === idx
                                                            ? 'text-maha-green-500 bg-maha-green-100'
                                                            : 'text-gray-500 bg-gray-100'
                                                    }`}>
                                                    {total}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <span className="absolute text-gray-300 transform translate-y-1/2 pointer-events-none">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                    <Searchinput
                                        placeholder="Search"
                                        onChange={e => searchItems(e)}
                                    />
                                </div>
                            </div>
                            <div className={`${openTab === 1 ? '' : 'hidden'}`}>
                                <Listinvoices
                                    datas={filteredResults}
                                    loading={isLoadingInvoice}
                                />
                            </div>
                            <div className={`${openTab === 2 ? '' : 'hidden'}`}>
                                <Listinvoices
                                    datas={filteredOverdue}
                                    loading={isLoadingInvoice}
                                />
                            </div>
                            <div className={`${openTab === 3 ? '' : 'hidden'}`}>
                                <Listinvoices
                                    datas={filteredOutstanding}
                                    loading={isLoadingInvoice}
                                />
                            </div>
                            <div className={`${openTab === 4 ? '' : 'hidden'}`}>
                                <Listinvoices
                                    datas={filteredPaid}
                                    loading={isLoadingInvoice}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                {/* right column */}
                <div className="w-full space-y-3 sm:w-1/6">
                    <Subtitle
                        title="Monthly Statements"
                        content={statement}
                        placement="left"
                        css={{
                            width: 'fit-content',
                        }}
                    />
                    <div className="flex flex-wrap h-full space-x-3 sm:flex-nowrap">
                        <Card>
                            <div className="flex items-center justify-between">
                                <ul
                                    className="flex flex-row flex-wrap w-full m-0 list-none bg-gray-600"
                                    role="tablist">
                                    {outstandings.map((os, idx) => (
                                        <li
                                            key={idx}
                                            className={`${
                                                openStateTab === os.currency
                                                    ? 'text-gray-600 bg-white'
                                                    : 'text-white'
                                            } flex-auto text-center last:mr-0 border-[1px] border-gray-600 px-4 py-2`}>
                                            <a
                                                className="block h-full text-xs font-bold leading-normal"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setOpenStateTab(os.currency)
                                                }}
                                                data-toggle="tab"
                                                href={`#${os.currency.toLowerCase()}`}
                                                role="tablist">
                                                {os.currency}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Mainlayout>
    )
}
