import {
    faBoxes,
    faBoxOpen,
    faCalendarCheck,
    faCalendarWeek,
    faCircleInfo,
    faDownload,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import _ from 'lodash'
import Mainlayout from '@/components/Layouts/MainLayout'
import Card from '@/components/Card/Card'
import useSAP from '@/lib/sap'
import Maintitle from '@/components/Typography/MainTitle'
import Processing from '@/components/Layouts/Processing'
import BtnAccordion from '@/components/Button/BtnAccordion'
import { useSortableData } from '@/utils/sortable'
import Sorting from '@/components/Button/Sorting'
import { paginate } from '@/utils/paginate'

const tooltips = (
    <span>
        All current and historical POs are displayed.
        <br /> You may search them by item or PO no.
    </span>
)

const renderCell = val => (
    <span
        key={val}
        className={`${
            val === 'Open'
                ? 'border-2 border-blue-300 bg-blue-100 text-blue-500'
                : val === 'Scheduled'
                ? 'border-2 border-purple-300 bg-purple-100 text-maha-500'
                : 'border-2 border-gray-300 bg-gray-100 text-gray-500'
        }  mr-1 rounded-md px-2 py-0.5 font-semibold`}>
        {val}
    </span>
)

function LinkDownload({ link, label }) {
    if (link) {
        return (
            <Link href={link} passHref>
                <span className="px-2 py-1 font-semibold rounded cursor-pointer text-green-dark bg-green-light whitespace-nowrap">
                    <FontAwesomeIcon icon={faDownload} /> {label}
                </span>
            </Link>
        )
    }
}

function renderColor(d, stat) {
    const dt = d.slice(0, 10)
    const date = new Date(dt)
    const today = new Date()
    const color = date > today ? 'text-maha-500 font-semibold' : ''
    if (stat) {
        if (stat.toLowerCase() !== 'delivered') return color
        return ''
    }
    return ''
}

function renderDateReceive(str) {
    const d = str.slice(0, 10)
    const date = new Date(d)
    const poDate = `${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }/${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }/${date.getFullYear()}`
    return poDate
}

// Order by item start
function OrderByPo({ datas, loading }) {
    if (loading) return <Processing />
    if (!datas) return <p>No data</p>

    const { items, requestSort, sortConfig } = useSortableData(datas, {
        direction: 'descending',
    })
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return ''
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const pageCount = datas.length / pageSize

    const pages = _.range(1, pageCount + 1)

    const paginateOrderByPo = paginate(items, currentPage, pageSize)
    return (
        <div className="flex h-[73vh] flex-col rounded-lg">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 w-3 px-6 py-3 font-semibold text-gray-500 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 font-semibold text-gray-500 bg-gray-100">
                                <Sorting
                                    handleClick={() => requestSort('poNumber')}
                                    className={getClassNamesFor('poNumber')}>
                                    po
                                </Sorting>
                            </th>
                            <th className="sticky top-0 px-6 py-3 font-semibold text-gray-500 bg-gray-100">
                                <Sorting
                                    handleClick={() =>
                                        requestSort('poReceived')
                                    }
                                    className={getClassNamesFor('poReceived')}>
                                    po received
                                </Sorting>
                            </th>
                            <th className="sticky top-0 px-6 py-3 font-semibold text-gray-500 bg-gray-100">
                                status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {paginateOrderByPo &&
                            paginateOrderByPo.map((data, idx) => (
                                <ItemByPo key={idx} data={data} />
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center p-3">
                <Pagination
                    total={pages.length}
                    page={currentPage}
                    initialPage={1}
                    color="secondary"
                    size="sm"
                    shadow
                    siblings={2}
                    noMargin
                    onChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

function ItemByPo({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    return (
        <>
            <tr key={data.poNumber} className="hover:bg-gray-100">
                <td className="px-6 py-1.5 text-left">
                    <BtnAccordion expand={isExpanded} onClick={handleClick} />
                </td>
                <td className="px-6 py-1.5 text-left">{data.poNumber}</td>
                <td className="px-6 py-1.5 text-left">
                    {renderDateReceive(data.poReceived)}
                </td>
                <td className="whitespace-nowrap px-6 py-1.5 text-left">
                    {renderCell(data.poStatus)}
                </td>
            </tr>

            <OrderDetailByPo
                parentExpanded={isExpanded}
                details={data.details}
            />
        </>
    )
}

function OrderDetailByPo({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    const renderStat = val => (
        <span
            className={`${
                val.toLowerCase() === 'unfulfilled'
                    ? 'border-[1px] border-red-300 bg-red-100 text-red-500'
                    : val.toLowerCase() === 'fulfilled'
                    ? 'border-[1px] border-green-300 bg-green-100 text-green-500'
                    : 'border-[1px] border-orange-300 bg-orange-100 text-orange-500'
            }  mr-1 rounded-md px-2 py-0.5 text-[0.6rem] font-semibold`}>
            {val}
        </span>
    )
    const { items, requestSort, sortConfig } = useSortableData(details, {
        direction: 'descending',
    })
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return ''
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return (
        <tr>
            <td
                colSpan={4}
                className={`${!isExpanded ? 'hidden' : ''} bg-table py-2 px-5`}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-[1px] border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                            <th className="px-3 py-2 rounded-tl-md">
                                <Sorting
                                    handleClick={() => requestSort('itemName')}
                                    className={getClassNamesFor('itemName')}>
                                    item name
                                </Sorting>
                            </th>
                            <th className="px-3 py-2">open qty</th>
                            <th className="px-3 py-2">total qty</th>
                            <th className="px-3 py-2">unit price</th>
                            <th className="px-3 py-2">total invoice</th>
                            <th className="px-3 py-2">item status</th>
                            <th className="px-3 py-2 rounded-tr-md">
                                latest activity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items &&
                            items.map((detail, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b-[1px] border-gray-200 bg-white">
                                    <td className="px-3 py-2">
                                        {detail.itemName}
                                    </td>
                                    <td className="px-3 py-2">{`${detail.openQty.toLocaleString()} ${
                                        detail.uoM
                                    }`}</td>
                                    <td className="px-3 py-2">
                                        {`${detail.totalQty.toLocaleString()} ${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${
                                            detail.currency
                                        } ${detail.unitPrice.toLocaleString()}/${
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
                                            detail.activity,
                                        )}`}>
                                        {detail.activityDate.slice(0, 10) !==
                                        '1900-01-01'
                                            ? detail.activityDate.slice(
                                                  0,
                                                  10,
                                              ) !== '0001-01-01'
                                                ? `${renderDateReceive(
                                                      detail.activityDate,
                                                  )}-${Number(
                                                      detail.activityQty,
                                                  ).toLocaleString()}${
                                                      detail.uoM
                                                  } ${detail.activity}`
                                                : '-'
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </td>
        </tr>
    )
}
// Order by item end

// Order by item start
function OrderByItem({ datas, loading }) {
    if (loading) return <Processing />
    if (!datas) return <p>No data</p>

    const { items, requestSort, sortConfig } = useSortableData(datas, {
        direction: 'descending',
    })
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return ''
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const pageCount = datas.length / pageSize

    const pages = _.range(1, pageCount + 1)

    const paginateOrderByItem = paginate(items, currentPage, pageSize)

    return (
        <div className="flex h-[73vh] flex-col rounded-lg">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="font-semibold text-left text-gray-500 uppercase">
                            <th className="sticky top-0 w-3 px-6 py-3 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 bg-gray-100">
                                <Sorting
                                    handleClick={() => requestSort('itemName')}
                                    className={getClassNamesFor('itemName')}>
                                    name
                                </Sorting>
                            </th>
                            <th className="sticky top-0 px-6 py-3 bg-gray-100">
                                status
                            </th>
                            <th className="sticky top-0 px-6 py-3 bg-gray-100">
                                download
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {paginateOrderByItem &&
                            paginateOrderByItem.map((data, idx) => (
                                <ItemsByItem key={idx} data={data} />
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center p-3">
                <Pagination
                    total={pages.length}
                    page={currentPage}
                    initialPage={1}
                    color="secondary"
                    size="sm"
                    shadow
                    siblings={2}
                    noMargin
                    onChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

function ItemsByItem({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    return (
        <>
            <tr key={data.itemCode} className="hover:bg-gray-100">
                <td className="px-6 py-1.5 text-left">
                    <BtnAccordion expand={isExpanded} onClick={handleClick} />
                </td>
                <td className="px-6 py-1.5 text-left">{data.itemName}</td>
                <td className="px-6 py-1.5 text-left">
                    {renderCell(data.poStatus)}
                </td>
                <td className="whitespace-nowrap px-6 py-1.5 text-left">
                    <LinkDownload link={data.tdsLink} label="TDS" />{' '}
                    <LinkDownload link={data.sdsLink} label="SDS" />
                </td>
            </tr>

            <OrderDetailByItem
                parentExpanded={isExpanded}
                details={data.details}
            />
        </>
    )
}

function OrderDetailByItem({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    const renderStat = val => (
        <span
            className={`${
                val.toLowerCase() === 'unfulfilled'
                    ? 'border-[1px] border-red-300 bg-red-100 text-red-500'
                    : val.toLowerCase() === 'fulfilled'
                    ? 'border-[1px] border-green-300 bg-green-100 text-green-500'
                    : 'border-[1px] border-orange-300 bg-orange-100 text-orange-500'
            }  mr-1 rounded-md px-2 py-0.5 text-[0.6rem] font-semibold`}>
            {val}
        </span>
    )

    return (
        <tr>
            <td
                colSpan={4}
                className={`${!isExpanded ? 'hidden' : ''} bg-table py-2 px-5`}>
                <div className="rounded-sm border-[1px]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-[1px] text-xs font-semibold border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                                <th className="px-3 py-2 rounded-tl-md">
                                    P/O#
                                </th>
                                <th className="px-3 py-2">po received</th>
                                <th className="px-3 py-2">open qty</th>
                                <th className="px-3 py-2">total qty</th>
                                <th className="px-3 py-2">unit price</th>
                                <th className="px-3 py-2">total invoice</th>
                                <th className="px-3 py-2">item status</th>
                                <th className="px-3 py-2 rounded-tr-md">
                                    latest activity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details &&
                                details.map((detail, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b-[1px] border-gray-200 bg-white hover:bg-gray-100">
                                        <td className="px-3 py-2 text-blue-500">
                                            {detail.poNumber}
                                        </td>
                                        <td className="px-3 py-2">
                                            {renderDateReceive(
                                                detail.poReceived,
                                            )}
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
                                            } $${detail.unitPrice.toLocaleString()}/${
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
                                                detail.activity,
                                            )}`}>
                                            {detail.activityDate.slice(
                                                0,
                                                10,
                                            ) !== '1900-01-01'
                                                ? detail.activityDate.slice(
                                                      0,
                                                      10,
                                                  ) !== '0001-01-01'
                                                    ? `${renderDateReceive(
                                                          detail.activityDate,
                                                      )}-${Number(
                                                          detail.activityQty,
                                                      ).toLocaleString()}${
                                                          detail.uoM
                                                      } ${detail.activity}`
                                                    : '-'
                                                : '-'}
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
// Order by item end

function Summary({ sum, loading }) {
    if (loading) return <Processing />
    if (!sum) return <p>No data</p>
    const summary = sum

    return (
        <div className="flex flex-col h-96 sm:h-full">
            <div className="mx-4 flex h-1/4 flex-1 basis-1/4 items-center space-x-7 whitespace-nowrap border-b-[1px] border-gray-200 px-32 sm:px-0">
                <span className="rounded-full bg-red-100 px-3.5 py-3 text-red-600">
                    <FontAwesomeIcon icon={faBoxOpen} fixedWidth />
                </span>
                <div>
                    <div className="text-xs font-light text-gray-500">
                        Unfulfilled
                    </div>
                    <div className="text-2xl font-bold">
                        {summary.unfulfilled}
                    </div>
                </div>
            </div>
            <div className="mx-4 flex h-1/4 flex-1 basis-1/4 items-center space-x-7 whitespace-nowrap border-b-[1px] border-gray-200 px-32 sm:px-0">
                <span className="rounded-full bg-maha-500 bg-opacity-10 px-3.5 py-3 text-maha-500">
                    <FontAwesomeIcon icon={faCalendarWeek} fixedWidth />
                </span>
                <div>
                    <div className="text-xs font-light text-gray-500">
                        Scheduled
                    </div>
                    <div className="text-2xl font-bold">
                        {summary.scheduled}
                    </div>
                </div>
            </div>
            <div className="mx-4 flex h-1/4 flex-1 basis-1/4 items-center space-x-7 whitespace-nowrap border-b-[1px] border-gray-200 px-32 sm:px-0">
                <span className="rounded-full bg-orange-100 px-3.5 py-3 text-orange-600">
                    <FontAwesomeIcon icon={faBoxes} fixedWidth />
                </span>
                <div>
                    <div className="text-xs font-light text-gray-500">
                        Partially Fulfilled
                    </div>
                    <div className="text-2xl font-bold">
                        {summary.partially}
                    </div>
                </div>
            </div>
            <div className="flex items-center flex-1 px-32 mx-4 h-1/4 basis-1/4 space-x-7 whitespace-nowrap sm:px-0">
                <span className="rounded-full bg-green-100 px-3.5 py-3 text-green-600">
                    <FontAwesomeIcon icon={faCalendarCheck} fixedWidth />
                </span>
                <div>
                    <div className="text-xs font-light text-gray-500">
                        Fulfilled
                    </div>
                    <div className="text-2xl font-bold">
                        {summary.fulfilled}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OrderManagement() {
    const rcc = Cookies.get('rcc')
    const custgroup = Cookies.get('custgroup')

    const [orderByPo, setOrderByPo] = useState([])
    const [isLoadingByPo, setIsLoadingByPo] = useState(false)

    const [orderByItem, setOrderByItem] = useState([])
    const [isLoadingByItem, setIsLoadingByItem] = useState(false)

    const [openTab, setOpenTab] = useState('item')

    const [filteredListItem, setFilteredListItem] = useState([])
    const [filteredListPo, setFilteredListPo] = useState([])
    const searchItems = e => {
        const searchValue = e.target.value.toLowerCase()
        if (searchValue !== '') {
            const filteredDataPo = orderByPo.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            const filteredDataItem = orderByItem.filter(item =>
                Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue),
            )
            setFilteredListPo(filteredDataPo)
            setFilteredListItem(filteredDataItem)
        } else {
            setFilteredListPo(orderByPo)
            setFilteredListItem(orderByItem)
        }
    }

    // GET data order by PO
    async function fetchDataByPO() {
        setIsLoadingByPo(true)
        const response = await useSAP.get(`/Orders/GetOrdersByPo`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setOrderByPo(data)
        setFilteredListPo(data)
        setIsLoadingByPo(false)
    }

    // GET data order by Item
    async function fetchDataByItem() {
        setIsLoadingByItem(true)
        const response = await useSAP.get(`/Orders/GetOrdersByItem`, {
            params: {
                rcc,
                custgroup,
            },
        })
        const data = await response.data.data
        setOrderByItem(data)
        setFilteredListItem(data)
        setIsLoadingByItem(false)
    }

    useEffect(() => {
        fetchDataByPO()
        fetchDataByItem()
    }, [])

    return (
        <Mainlayout pageTitle="Order Management">
            <Maintitle title="Order Management" />
            {/* Title */}
            <div className="flex items-center py-3 font-semibold text-maha-500">
                All Orders{' '}
                <Tooltip content={tooltips} placement="right">
                    <span className="ml-2 text-gray-400">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </span>
                </Tooltip>
            </div>
            {/* Order */}
            <div className="flex flex-col h-full space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                {/* All Orders */}
                <div className="basis-4/5">
                    <Card additionalWrapperClasses="h-full">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                {/* Filter */}
                                <div className="flex items-center mb-2 space-x-1 text-xs">
                                    {/* Tabs */}
                                    <div className="flex items-center justify-start w-2/4 font-semibold text-gray-600">
                                        <ul
                                            className="flex flex-row mb-0 list-none"
                                            role="tablist">
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block space-x-2 px-3 py-3 text-xs font-bold leading-normal ${
                                                        openTab === 'item'
                                                            ? `border-b-2 border-green-dark text-gray-600`
                                                            : `text-gray-400`
                                                    }`}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setOpenTab('item')
                                                        // setFilteredListItem(
                                                        //     orderByItem.data,
                                                        // )
                                                    }}
                                                    data-toggle="tab"
                                                    href="#byItem"
                                                    role="tablist">
                                                    <span className="whitespace-nowrap">
                                                        By Item
                                                    </span>
                                                    <span
                                                        className={`${
                                                            openTab === 'item'
                                                                ? 'bg-green-light text-green-dark'
                                                                : 'bg-gray-100'
                                                        } rounded-md px-1 py-0.5`}>
                                                        {
                                                            filteredListItem.length
                                                        }
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block space-x-2 px-3 py-3 text-xs font-bold leading-normal ${
                                                        openTab === 'po'
                                                            ? `border-b-2 border-green-dark text-gray-600`
                                                            : `text-gray-400`
                                                    }`}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setOpenTab('po')
                                                        // setFilteredListPo(
                                                        //     orderByPo.data,
                                                        // )
                                                    }}
                                                    data-toggle="tab"
                                                    href="#byPo"
                                                    role="tablist">
                                                    <span className="whitespace-nowrap">
                                                        By PO
                                                    </span>
                                                    <span
                                                        className={`${
                                                            openTab === 'po'
                                                                ? 'bg-green-light text-green-dark'
                                                                : 'bg-gray-100'
                                                        } rounded-md px-1 py-0.5`}>
                                                        {filteredListPo.length}
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Search */}
                                    <div className="flex justify-end invisible w-2/4 sm:visible">
                                        <div>
                                            <span className="absolute text-gray-300 transform translate-y-1/2 pointer-events-none">
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                onChange={e => searchItems(e)}
                                                placeholder="Search"
                                                className="w-full px-3 py-2 placeholder-gray-300 border-b-2 border-gray-300 pl-7 focus:border-green-dark focus:outline-none focus:ring-0 "
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="relative flex flex-col w-full min-w-0 break-words bg-white">
                                    <div className="flex-auto">
                                        <div
                                            className={
                                                openTab === 'item'
                                                    ? ''
                                                    : 'hidden'
                                            }>
                                            <OrderByItem
                                                datas={filteredListItem}
                                                loading={isLoadingByItem}
                                            />
                                        </div>
                                        <div
                                            className={
                                                openTab === 'po' ? '' : 'hidden'
                                            }>
                                            <OrderByPo
                                                datas={filteredListPo}
                                                loading={isLoadingByPo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* Summary */}
                <div className="basis-1/5">
                    <Card
                        additionalWrapperClasses="h-full"
                        additionalInnerClasses="h-full">
                        <Summary sum={orderByPo[0]} loading={isLoadingByPo} />
                    </Card>
                </div>
            </div>
        </Mainlayout>
    )
}
