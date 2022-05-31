import Card from '@components/Card/Card'
import Searchinput from '@components/Inputs/SearchInput'
import Mainlayout from '@components/Layouts/MainLayout'
import Maintitle from '@components/Typography/MainTitle'
import Subtitle from '@components/Typography/SubTitle'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import ReactCountryFlag from 'react-country-flag'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import useSAP from '@/lib/sap'
import Processing from '@/components/Layouts/Processing'

const Bar = dynamic(() => import('@/components/Graph/Bar'), {
    ssr: false,
})

function renderDate(str) {
    const d = str.slice(0, 10)
    const date = new Date(d)
    const poDate = `${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }-${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getFullYear()}`
    return poDate
}

function OrderDetails({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    const renderStat = val => (
        <span
            className={`${
                val.toLowerCase() === 'unfulfilled'
                    ? 'border-red-300 bg-red-100 text-red-500'
                    : val.toLowerCase() === 'fulfilled'
                    ? 'border-green-300 bg-green-100 text-green-500'
                    : 'border-orange-300 bg-orange-100 text-orange-500'
            } mr-1 rounded-md border-[1px] px-2 py-0.5 text-[0.6rem] font-semibold`}>
            {val}
        </span>
    )
    function renderDateReceive(str) {
        const d = str.slice(0, 10)
        const date = new Date(d)
        const poDate = `${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }-${
            date.getMonth() < 9
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
        }-${date.getFullYear()}`
        return poDate
    }
    function renderColor(str) {
        const d = str.slice(0, 10)
        const date = new Date(d)
        const today = new Date()
        const color = date > today ? 'text-maha-500 font-semibold' : ''
        return color
    }
    return (
        <tr>
            <td
                colSpan={4}
                className={`${
                    !isExpanded ? 'hidden' : ''
                } bg-green-50 py-2 px-5 text-[10px]`}>
                <div className="rounded-sm border-[1px]">
                    <table className="w-full">
                        <thead>
                            <tr className="whitespace-nowrap border-b-[1px] border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                                <th className="px-3 py-2 rounded-tl-md">
                                    item
                                </th>
                                <th className="px-3 py-2">open qty</th>
                                <th className="px-3 py-2">total qty</th>
                                <th className="px-3 py-2">total invoice</th>
                                <th className="px-3 py-2">item status</th>
                                <th className="px-3 py-2 rounded-tr-md">
                                    scheduled delivery
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b-[1px] border-gray-200 bg-white hover:bg-gray-100">
                                    <td className="px-3 py-2">
                                        {detail.itemName}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${detail.openQty.toLocaleString()} ${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${detail.totalQty.toLocaleString()} ${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${
                                            detail.currency
                                        } $${detail.totalInvoice.toLocaleString()}`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {renderStat(detail.itemStatus)}
                                    </td>
                                    <td
                                        className={`px-3 py-2 ${renderColor(
                                            detail.activityDate,
                                        )}`}>
                                        {`${renderDateReceive(
                                            detail.activityDate,
                                        )} - ${
                                            detail.activityQty !== null
                                                ? detail.activityQty.toLocaleString()
                                                : '0.00'
                                        }${detail.uoM} ${detail.activity}`}
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

function Items({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    const renderStatItem = val => (
        <span
            className={`${
                val.toLowerCase() === 'open'
                    ? 'border-blue-300 bg-blue-100 text-blue-500'
                    : val.toLowerCase() === 'scheduled'
                    ? 'border-purple-300 bg-purple-100 text-maha-500'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
            } mr-1 rounded-md border-[1px] px-2 py-0.5 text-[0.6rem] font-semibold`}>
            {val}
        </span>
    )

    return (
        <>
            <tr key={data.poNumber} className="text-left hover:bg-gray-100">
                <td className="px-6 py-1.5">
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
                <td className="px-6 py-1.5 font-semibold text-blue-500">
                    {data.poNumber}
                </td>
                <td className="px-6 py-1.5">{renderDate(data.poReceived)}</td>
                <td className="px-6 py-1.5">{renderStatItem(data.poStatus)}</td>
            </tr>
            <OrderDetails parentExpanded={isExpanded} details={data.details} />
        </>
    )
}

function Orders({ datas, loading }) {
    if (loading) return <Processing />
    if (!datas) return <p>No data</p>
    return (
        <div className="flex h-[65vh] flex-col rounded-lg pt-2">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 w-3 px-6 py-3 text-gray-400 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                p/o#
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po received
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {datas.length > 0 ? (
                            datas.map((item, idx) => (
                                <Items key={idx} data={item} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="py-4 font-semibold text-center">
                                    No data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Account({ detail, loading }) {
    if (loading) return <Processing />
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

function TableInv({ invoices, loading }) {
    if (loading) return <Processing />
    if (!invoices) return <p>No data</p>
    const renderCell = val => (
        <span
            className={`${
                val === 'Overdue'
                    ? 'border-red-300 bg-red-100 text-red-500'
                    : 'border-orange-300 bg-orange-100 text-orange-500'
            } mr-1 rounded-lg border-[1px] px-2 py-0.5 font-semibold`}>
            {val}
        </span>
    )
    const renderDueIn = (val, stat) => (
        <span
            className={`${
                stat === 'Overdue' ? 'text-red-500' : 'text-orange-500'
            }  mr-1 px-2 py-0.5 font-semibold`}>
            {val}
        </span>
    )
    return (
        <div className="h-44 overflow-auto rounded-md border-[1px] text-[9px]">
            <table className="relative w-full">
                <thead>
                    <tr>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100 rounded-tl-md">
                            invoice#
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            due date
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            status
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            due in
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100 rounded-tr-md">
                            amount due
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((inv, idx) => (
                            <tr key={idx} className="hover:bg-gray-100">
                                <td className="px-3 py-2">
                                    <span className="font-semibold text-blue-800">
                                        {inv.invNumber}
                                    </span>
                                </td>
                                <td className="px-3 py-2">
                                    {renderDate(inv.dueDate)}
                                </td>
                                <td className="px-3 py-2">
                                    {renderCell(inv.invStatus)}
                                </td>
                                <td className="px-3 py-2">
                                    {renderDueIn(inv.dueIn, inv.invStatus)}
                                </td>
                                <td className="px-3 py-2">
                                    {inv.amountDue.toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="py-4 font-semibold text-center">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default function Index() {
    const router = useRouter()

    const rcc = Cookies.get('rcc')
    const custgroup = Cookies.get('custgroup')

    const [openTab, setOpenTab] = useState(1)

    const [openPO, setOpenPO] = useState([])
    const [isLoadingOpenPO, setIsLoadingOpenPO] = useState(false)
    const [filteredResults, setFilteredResults] = useState([])
    const [dataScheduled, setDataScheduled] = useState([])
    const [filteredScheduled, setFilteredScheduled] = useState([])
    const [isLoadingOutstanding, setIsLoadingOutstanding] = useState(false)
    const [outstandings, setOutstandings] = useState([])
    const [isLoadingPayable, setIsLoadingPayable] = useState(false)
    const [payable, setPayable] = useState([])
    const [openTabBar, setOpenTabBar] = useState('')
    const [invoices, setInvoices] = useState([])
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false)

    // GET data Open PO
    async function fetchDataOpenPO() {
        setIsLoadingOpenPO(true)
        const response = await useSAP.get(`/DashboardDRM/GetOpenPO`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setOpenPO(data)
        setFilteredResults(data)
        const scheduledItem = data.filter(newVal =>
            newVal.poStatus.toLowerCase().includes('scheduled'),
        )
        setDataScheduled(scheduledItem)
        setFilteredScheduled(scheduledItem)
        setIsLoadingOpenPO(false)
    }

    // GET data Outstanding
    async function fetchDataOutstanding() {
        setIsLoadingOutstanding(true)
        const response = await useSAP.get(`/Invoices/GetOutstandingPayables`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setOutstandings(data[0].details)
        setIsLoadingOutstanding(false)
    }

    // GET data Payable by age
    async function fetchDataPayable() {
        setIsLoadingPayable(true)
        const response = await useSAP.get(`/DashboardDRM/GetPayableByAge`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setPayable(data[0])
        setOpenTabBar(data[0].foreignCurrency)
        setIsLoadingPayable(false)
    }

    // GET data Invoices
    async function fetchDataInvoices() {
        setIsLoadingInvoice(true)
        const response = await useSAP.get(`/DashboardDRM/GetOpenInvoices`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setInvoices(data)
        setIsLoadingInvoice(false)
    }

    useEffect(() => {
        fetchDataOpenPO()
        fetchDataOutstanding()
        fetchDataPayable()
        fetchDataInvoices()
    }, [])

    const searchItems = e => {
        const searchValue = e.target.value.toLowerCase()
        if (searchValue !== '') {
            const filteredData = openPO.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            const filteredDataSchedule = dataScheduled.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            setFilteredResults(filteredData)
            setFilteredScheduled(filteredDataSchedule)
        } else {
            setFilteredResults(openPO)
            setFilteredScheduled(dataScheduled)
        }
    }
    let LC = []
    let FC = []
    if (!isLoadingPayable) {
        LC = [
            { day: '90+ days', amount: payable.aging_90_LC, color: '#DE1B1B' },
            {
                day: '61-90 days',
                amount: payable.aging_61_90LC,
                color: '#FA8E8E',
            },
            {
                day: '31-60 days',
                amount: payable.aging_31_60LC,
                color: '#F5BC76',
            },
            {
                day: '0-30 days',
                amount: payable.aging_0_30LC,
                color: '#FFDE86',
            },
            {
                day: 'Not Due',
                amount: payable.aging_Future_RemitLC,
                color: '#8CC73F',
            },
        ]

        FC = [
            { day: '90+ days', amount: payable.aging_90_FC, color: '#DE1B1B' },
            {
                day: '61-90 days',
                amount: payable.aging_61_90FC,
                color: '#FA8E8E',
            },
            {
                day: '31-60 days',
                amount: payable.aging_31_60FC,
                color: '#F5BC76',
            },
            {
                day: '0-30 days',
                amount: payable.aging_0_30FC,
                color: '#FFDE86',
            },
            {
                day: 'Not Due',
                amount: payable.aging_Future_RemitFC,
                color: '#8CC73F',
            },
        ]
    }

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/dashboard')
    }, [])

    return (
        <Mainlayout pageTitle="Dashboard">
            <Maintitle title="Dashboard" />
            <div className="flex gap-2">
                {/* Open Orders */}
                <div className="w-4/6 space-y-3">
                    <Subtitle
                        title="Open Orders"
                        content="Only outstanding & unfulfilled orders are displayed."
                        placement="right"
                    />
                    <Card additionalWrapperClasses="text-xs">
                        <div className="flex items-center justify-between">
                            <ul
                                className="flex flex-row flex-wrap pb-2 mb-0 list-none"
                                role="tablist">
                                {[
                                    [1, 'All', filteredResults.length],
                                    [2, 'Scheduled', filteredScheduled.length],
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
                        <div>
                            <div className={`${openTab === 1 ? '' : 'hidden'}`}>
                                <Orders
                                    datas={filteredResults}
                                    loading={isLoadingOpenPO}
                                />
                            </div>
                            <div className={`${openTab === 2 ? '' : 'hidden'}`}>
                                <Orders
                                    datas={filteredScheduled}
                                    loading={isLoadingOpenPO}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Total outstanding payables */}
                <div className="w-2/6 space-y-3">
                    <Subtitle
                        title="Total Outstanding Payables"
                        content="Only outstanding & overdue invoices are displayed."
                        placement="top"
                    />
                    <div className="flex gap-2">
                        {outstandings.map((detail, idx) => (
                            <div key={idx} className="w-1/2">
                                <Card>
                                    <Account
                                        detail={detail}
                                        loading={isLoadingOutstanding}
                                    />
                                </Card>
                            </div>
                        ))}
                    </div>
                    <Card>
                        <div className="flex flex-col">
                            {/* Title */}
                            <div className="text-sm font-semibold text-gray-600">
                                Account Payable by Age
                            </div>
                            {/* Tabs */}
                            <div>
                                {!isLoadingPayable ? (
                                    <div className="w-full">
                                        <ul
                                            className="flex flex-row flex-wrap pt-3 pb-2 mb-0 list-none"
                                            role="tablist">
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block px-5 py-3 text-xs font-bold uppercase leading-normal ${
                                                        openTabBar ===
                                                        payable.foreignCurrency
                                                            ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-500 bg-maha-500 text-white'
                                                            : 'border-b-2 border-maha-500 bg-white text-gray-500'
                                                    }`}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setOpenTabBar(
                                                            payable.foreignCurrency,
                                                        )
                                                    }}
                                                    data-toggle="tab"
                                                    href={`#${payable.foreignCurrency}`}
                                                    role="tablist">
                                                    {payable.foreignCurrency}
                                                </a>
                                            </li>
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block px-5 py-3 text-xs font-bold uppercase leading-normal ${
                                                        openTabBar ===
                                                        payable.localCurrency
                                                            ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-500 bg-maha-500 text-white'
                                                            : 'border-b-2 border-maha-500 bg-white text-gray-500'
                                                    }`}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setOpenTabBar(
                                                            payable.localCurrency,
                                                        )
                                                    }}
                                                    data-toggle="tab"
                                                    href={`#${payable.localCurrency}`}
                                                    role="tablist">
                                                    {payable.localCurrency}
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="relative flex flex-col w-full min-w-0 mb-2 break-words bg-white ">
                                            <div className="flex-auto">
                                                <div className="tab-content tab-space">
                                                    <div
                                                        className={
                                                            openTabBar ===
                                                            payable.localCurrency
                                                                ? 'block'
                                                                : 'hidden'
                                                        }
                                                        id={
                                                            payable.localCurrency
                                                        }>
                                                        <Bar
                                                            datas={LC}
                                                            cur={
                                                                payable.localCurrency
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            openTabBar ===
                                                            payable.foreignCurrency
                                                                ? 'block'
                                                                : 'hidden'
                                                        }
                                                        id={
                                                            payable.foreignCurrency
                                                        }>
                                                        <Bar
                                                            datas={FC}
                                                            cur={
                                                                payable.foreignCurrency
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center py-3 text-xs">
                                        loading bar chart...
                                    </div>
                                )}
                            </div>

                            {/* Open Invoices */}
                            <TableInv
                                invoices={invoices}
                                loading={isLoadingInvoice}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </Mainlayout>
    )
}
