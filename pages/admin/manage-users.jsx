import {
    faInfoCircle,
    faPenToSquare,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Spacer, Tooltip } from '@nextui-org/react'
import Card from '@/components/Card/Card'
import Searchinput from '@/components/Inputs/SearchInput'
import Adminlayout from '@/components/Layouts/AdminLayout'
import Maintitle from '@/components/Typography/MainTitle'
import Subtitle from '@/components/Typography/SubTitle'
import axios from '@/lib/axios'
import Processing from '@/components/Layouts/Processing'
import ModalEditUser from '@/components/Modals/ModalEditUser'
import Notification from '@/components/Modals/Notification'
import Button from '@/components/Button/Button'
import ModalDeactivateAccount from '@/components/Modals/ModalDeactivateAccount'
import ModalActivateAccount from '@/components/Modals/ModalActivateAccount'

function Users({
    datas,
    loading,
    handlerModal,
    handlerModalDeactivateAccount,
    handlerModalActivateAccount,
}) {
    if (loading) return <Processing />
    if (!datas) return <p>No data</p>

    const [selectedUsers, setSelectedUsers] = useState([])

    const handleSelectAllUsers = () => {
        if (selectedUsers.length < datas.length) {
            setSelectedUsers(datas.map(({ id }) => id))
        } else {
            setSelectedUsers([])
        }
    }

    const handleSelectUser = event => {
        const userId = parseInt(event.target.value, 10)

        if (!selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers => [...selectedUsers, userId])
        } else {
            setSelectedUsers(
                selectedUsers.filter(
                    selectedUserId => !!selectedUserId === userId,
                ),
            )
        }
    }

    const renderStatItem = val => (
        <span
            className={`${
                val === 1
                    ? 'border-green-active-outer bg-green-active-inner text-green-active'
                    : val === 0
                    ? 'border-red-300 bg-red-100 text-red-500'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
            } mr-1 rounded-md border-[1px] px-2 py-1 text-[0.6rem] font-semibold`}>
            {val === 1 ? 'Active' : 'Inactive'}
        </span>
    )

    return (
        <div className="flex h-[65vh] flex-col rounded-lg pt-2">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 w-3 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 checked:accent-maha-500"
                                    checked={
                                        selectedUsers.length === datas.length
                                    }
                                    onChange={handleSelectAllUsers}
                                />
                            </th>
                            <th className="sticky top-0 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                email address
                            </th>
                            <th className="sticky top-0 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                name
                            </th>
                            <th className="sticky top-0 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                customer group
                            </th>
                            <th className="sticky top-0 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                companies assigned
                            </th>
                            <th className="sticky top-0 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                status
                            </th>
                            <th className="sticky top-0 w-48 px-6 py-4 font-semibold text-gray-500 bg-gray-100">
                                actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {datas.length > 0 ? (
                            datas.map(user => (
                                <tr
                                    key={user.id}
                                    className="text-left text-gray-600 hover:bg-content group">
                                    <td className="px-6 py-3">
                                        <input
                                            type="checkbox"
                                            value={user.id}
                                            className="w-4 h-4 checked:accent-maha-500"
                                            id={`user_${user.id}`}
                                            checked={selectedUsers.includes(
                                                user.id,
                                            )}
                                            onChange={handleSelectUser}
                                        />
                                    </td>
                                    <td className="px-6 py-3">{user.email}</td>
                                    <td className="px-6 py-3">{user.name}</td>
                                    <td className="px-6 py-3">
                                        {user.group.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        1/1{' '}
                                        <span className="text-gray-300">
                                            <Tooltip
                                                color="invert"
                                                content="1. Celcode Derma Lab Pte Ltd"
                                                placement="right">
                                                <FontAwesomeIcon
                                                    icon={faInfoCircle}
                                                    size="1x"
                                                />
                                            </Tooltip>
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        {renderStatItem(user.active)}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex justify-start items-center min-h-[28px]">
                                            <Link href="#">
                                                <a
                                                    className="text-gray-400"
                                                    onClick={handlerModal}>
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                        size="xl"
                                                    />
                                                </a>
                                            </Link>
                                            <Spacer />
                                            {user.active ? (
                                                <Button
                                                    type="button"
                                                    onClick={
                                                        handlerModalDeactivateAccount
                                                    }
                                                    className="hidden px-2 py-1 font-semibold bg-white border-2 border-gray-700 rounded-md hover:bg-gray-50 group-hover:block">
                                                    Deactivate
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    onClick={
                                                        handlerModalActivateAccount
                                                    }
                                                    className="hidden px-2 py-1 font-semibold text-white border-2 rounded-md bg-btn-accordion border-btn-accordion hover:opacity-75 group-hover:block">
                                                    Activate
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
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

export default function ManageUsers() {
    const [openTab, setOpenTab] = useState(1)

    const [visible, setVisible] = useState(false)
    const [visibleDeactivate, setVisibleDeactivate] = useState(false)
    const [visibleActivate, setVisibleActivate] = useState(false)
    const handlerModal = () => setVisible(true)
    const handlerModalDeactivateAccount = () => setVisibleDeactivate(true)
    const handlerModalActivateAccount = () => setVisibleActivate(true)

    const closeHandler = () => {
        setVisible(false)
        setVisibleDeactivate(false)
        setVisibleActivate(false)
    }

    // const [users, setUsers] = useState([])
    const [userActive, setUserActive] = useState([])
    const [userInActive, setUserInActive] = useState([])
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)

    // GET data Invoices
    async function fetchDataCustomers() {
        setIsLoadingUsers(true)
        const response = await axios.get(`/api/users`)
        const data = await response.data.data
        // setUsers(data)
        const inActiveUsers = data.filter(newVal => newVal.active === 0)
        const activeUsers = data.filter(newVal => newVal.active === 1)
        setUserInActive(inActiveUsers)
        setUserActive(activeUsers)
        setIsLoadingUsers(false)
    }

    useEffect(() => {
        fetchDataCustomers()
    }, [])
    return (
        <Adminlayout pageTitle="Manage Users">
            <Notification
                notif={false}
                status="Success"
                message="A confirmation has been sent to <strong>achmadjp7@gmail.com</strong>"
            />
            <Maintitle title="Manage Users" />
            <div className="flex gap-2">
                {/* Customer List */}
                <div className="w-full space-y-3">
                    <Subtitle
                        title="Customer List"
                        content="Activate or edit accounts for customers registered in SAP."
                        placement="right"
                    />
                    <Card additionalWrapperClasses="text-xs">
                        <div className="flex items-center justify-between">
                            <ul
                                className="flex flex-row flex-wrap mb-0 list-none"
                                role="tablist">
                                {[
                                    [1, 'Active', userActive.length],
                                    [2, 'Inactive', userInActive.length],
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
                                    // onChange={e => searchItems(e)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`${openTab === 1 ? '' : 'hidden'}`}>
                                <Users
                                    datas={userActive}
                                    loading={isLoadingUsers}
                                    handlerModal={handlerModal}
                                    handlerModalDeactivateAccount={
                                        handlerModalDeactivateAccount
                                    }
                                    handlerModalActivateAccount={
                                        handlerModalActivateAccount
                                    }
                                />
                            </div>
                            <div className={`${openTab === 2 ? '' : 'hidden'}`}>
                                <Users
                                    datas={userInActive}
                                    loading={isLoadingUsers}
                                    handlerModal={handlerModal}
                                    handlerModalDeactivateAccount={
                                        handlerModalDeactivateAccount
                                    }
                                    handlerModalActivateAccount={
                                        handlerModalActivateAccount
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <ModalEditUser visible={visible} closeHandler={closeHandler} />
            <ModalDeactivateAccount
                visible={visibleDeactivate}
                closeHandler={closeHandler}
            />
            <ModalActivateAccount
                visible={visibleActivate}
                closeHandler={closeHandler}
            />
        </Adminlayout>
    )
}
