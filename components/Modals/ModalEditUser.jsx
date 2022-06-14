import {
    faChevronDown,
    faCircle,
    faPenToSquare,
    faPlus,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Spacer } from '@nextui-org/react'
import { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import StatusDropdown from '../Inputs/StatusDropdown'

const options = [
    {
        label: 'Apple',
        value: 'apple',
    },
    {
        label: 'Mango',
        value: 'mango',
    },
    {
        label: 'Banana',
        value: 'banana',
    },
    {
        label: 'Pineapple',
        value: 'pineapple',
    },
]

export default function ModalEditUser({
    visible = false,
    closeHandler,
    submitHandler,
    ...props
}) {
    const [defEmail, setDefEmail] = useState('')
    const [rowsData, setRowsData] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [status, setStatus] = useState('')

    const handleChangeDefault = e => {
        const selectedEmail = e.target.value
        setDefEmail(selectedEmail)
    }

    const addTableRows = () => {
        const rowsInput = {
            name: '',
            email: '',
            company: '',
            status: '',
        }
        setRowsData([...rowsData, rowsInput])
    }
    const deleteTableRows = index => {
        const rows = [...rowsData]
        rows.splice(index, 1)
        setRowsData(rows)
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target
        const rowsInput = [...rowsData]
        rowsInput[index][name] = value
        setRowsData(rowsInput)
    }

    return (
        <>
            <Modal
                closeButton
                width="65%"
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                css={{ paddingTop: 0 }}>
                <Modal.Header
                    // autoMargin
                    justify="flex-start"
                    css={{
                        background: '#EBEFF5',
                        color: '#434A54',
                        paddingRight: '2rem',
                    }}>
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                    <Spacer />{' '}
                    <h1 className="text-lg font-semibold">
                        MANAGE COMPANY ACCOUNTS
                    </h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="container p-4 space-y-10">
                        <div className="flex flex-row">
                            <div className="w-2/3 pr-5 border-r-2 border-gray-300">
                                <h2 className="pb-3 font-semibold text-gray-600">
                                    Set default email
                                </h2>
                                <div className="flex gap-3">
                                    <div className="flex-initial w-1/3">
                                        <Input
                                            className="rounded-none"
                                            disabled
                                            value="test"
                                            label="Customer Group"
                                        />
                                    </div>
                                    <div className="flex-initial w-2/3">
                                        <div className="pb-2 text-xs text-gray-500 uppercase">
                                            Default Email
                                        </div>
                                        <select
                                            value={defEmail}
                                            onChange={e =>
                                                handleChangeDefault(e)
                                            }
                                            className="w-full px-3 py-2 text-gray-500 placeholder-gray-300 border border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300">
                                            <option value="">
                                                Choose a email
                                            </option>
                                            {options.map(option => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 pl-5">
                                <h2 className="pb-3 font-semibold text-gray-600">
                                    Companies
                                </h2>
                                <ul className="text-sm text-gray-500 capitalize">
                                    <li>NIPPON singapore pte ltd</li>
                                    <li>3M GROUP</li>
                                    <li>COLORANT</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-full">
                                <h2 className="pb-3 font-semibold text-gray-600">
                                    Edit Users
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <table className="w-full space-x-3 table-auto">
                                        <thead>
                                            <tr className="text-xs text-gray-500 uppercase">
                                                <th className="w-3/12 pb-1 font-light">
                                                    name
                                                </th>
                                                <th className="w-3/12 pb-1 font-light">
                                                    email
                                                </th>
                                                <th className="w-4/12 pb-1 font-light">
                                                    companies
                                                </th>
                                                <th className="w-2/12 pb-1 font-light">
                                                    status
                                                </th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowsData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="pb-2 pr-2">
                                                            <Input
                                                                className="rounded-none"
                                                                type="text"
                                                                name="name"
                                                                value={
                                                                    data.name
                                                                }
                                                                onChange={evnt =>
                                                                    handleChange(
                                                                        index,
                                                                        evnt,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="pb-2 pr-2">
                                                            <Input
                                                                className="rounded-none"
                                                                type="text"
                                                                name="email"
                                                                value={
                                                                    data.email
                                                                }
                                                                onChange={evnt =>
                                                                    handleChange(
                                                                        index,
                                                                        evnt,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="pb-2 pr-2">
                                                            <Input
                                                                className="rounded-none"
                                                                type="text"
                                                                name="company"
                                                                value={
                                                                    data.company
                                                                }
                                                                onChange={evnt =>
                                                                    handleChange(
                                                                        index,
                                                                        evnt,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-row pb-2">
                                                            <StatusDropdown />
                                                            {/* <button
                                                                className="text-right btn btn-outline-danger"
                                                                onClick={() =>
                                                                    deleteTableRows(
                                                                        index,
                                                                    )
                                                                }>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTimes
                                                                    }
                                                                    className="text-red-500"
                                                                />
                                                            </button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-start">
                                        <Button
                                            type="button"
                                            onClick={addTableRows}
                                            className="w-auto px-4 py-2 text-sm text-white rounded bg-maha-green-400">
                                            <FontAwesomeIcon icon={faPlus} />{' '}
                                            Add User
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer justify="flex-end">
                    <div className="flex px-4 py-2 space-x-2">
                        <Button
                            type="button"
                            onClick={closeHandler}
                            className="px-5 py-2 text-white bg-gray-600 rounded hover:opacity-50">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            // onClick={closeHandler}
                            className="px-5 py-2 text-white rounded bg-maha-green-400 hover:opacity-50">
                            save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
