import Card from '@components/Card/Card'
import Searchinput from '@components/Inputs/SearchInput'
import Mainlayout from '@components/Layouts/MainLayout'
import Maintitle from '@components/Typography/MainTitle'
import Subtitle from '@components/Typography/SubTitle'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import useSAP from '@/lib/sap'
import { Tooltip } from '@nextui-org/react'

export default function Index() {
    const [openTab, setOpenTab] = useState(1)
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [countScheduled, setcountScheduled] = useState(0)

    useEffect(() => {
        setLoading(true)
        useSAP
            .get('/DashboardDRM/GetOpenPO', {
                params: {
                    rcc: 'MCA',
                    custgroup: 'NIPPON',
                },
            })
            // .then(res => console.log(res))
            .then(res => {
                // console.log(res.data.data)
                setData(res.data.data)
                setLoading(false)
            })
    }, [])

    function renderDate(str) {
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
                        ? 'border-purple-300 bg-purple-100 text-maha-purple'
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
                                        isExpanded
                                            ? { rotate: 180 }
                                            : { rotate: 0 }
                                    }
                                />
                            </button>
                        </Tooltip>
                    </td>
                    <td className="px-6 py-1.5 font-semibold text-blue-500">
                        {data.poNumber}
                    </td>
                    <td className="px-6 py-1.5">
                        {renderDate(data.poReceived)}
                    </td>
                    <td className="px-6 py-1.5">
                        {renderStatItem(data.poStatus)}
                    </td>
                </tr>

                {/* <OrderDetails
                    parentExpanded={isExpanded}
                    details={data.details}
                /> */}
            </>
        )
    }

    function Orders({ datas }) {
        const capitalize = str => {
            const lower = str.toLowerCase()
            return str.charAt(0).toUpperCase() + lower.slice(1)
        }

        //Filter data
        const filterStat = stat => {
            const newItem = datas
            // if (stat !== 'All') {
            //     newItem = data.filter(newVal =>
            //         newVal.poStatus.includes(capitalize(stat)),
            //     )
            // }
            console.log(newItem)
            setData(newItem)
            setcountScheduled(newItem.length)
        }

        if (isLoading) return <p className="p-4 mx-auto">Loading...</p>
        if (!datas) return <p>No data</p>

        return (
            <div className="flex h-[64vh] flex-col rounded-lg pt-2">
                <div className="flex-grow overflow-auto rounded-md border-[1px]">
                    <table className="relative w-full text-xs">
                        <thead>
                            <tr className="text-left uppercase">
                                <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100" />
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
                            {datas.map((item, idx) => (
                                <Items key={idx} data={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

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
                                    [1, 'All', 32],
                                    [2, 'Scheduled', 2],
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
                                                filterStat(title)
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
                                    onChange={event => handleSearch(event)}
                                />
                            </div>
                        </div>
                        <div>
                            {[
                                [1, 'All', 32],
                                [2, 'Scheduled', 2],
                            ].map(([idx, title, total]) => (
                                <div
                                    key={idx}
                                    className={`${
                                        openTab === idx ? '' : 'hidden'
                                    }`}>
                                    <Orders datas={data} />
                                </div>
                            ))}
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
                        <div className="w-1/2">
                            <Card>content</Card>
                        </div>
                        <div className="w-1/2">
                            <Card>content</Card>
                        </div>
                    </div>
                </div>
            </div>
        </Mainlayout>
    )
}
