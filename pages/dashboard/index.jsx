import Card from '@components/Card/Card'
import Searchinput from '@components/Inputs/SearchInput'
import Mainlayout from '@components/Layouts/MainLayout'
import Maintitle from '@components/Typography/MainTitle'
import Subtitle from '@components/Typography/SubTitle'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Index() {
    const [openTab, setOpenTab] = useState(1)
    const handleSearch = event => {
        // const value = event.target.value.toLowerCase()
        // let result = []
        // result = dataOpenPo.data.filter(
        //     data => data.poNumber.search(value) !== -1,
        // )
        // setItem(result)
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
                                    test {title}
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
