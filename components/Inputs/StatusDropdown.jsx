import { faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function StatusDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [status, setStatus] = useState('')
    return (
        <>
            <div
                className="relative flex items-center justify-between flex-grow px-3 py-2 mr-2 text-gray-500 border border-gray-300 rounded-none focus:outline-none"
                onClick={() => setDropdownOpen(prevState => !prevState)}>
                {status === 'inactive' ? (
                    <span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-red-500"
                            size="xs"
                        />{' '}
                        Inactive
                    </span>
                ) : (
                    <span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-maha-green-400"
                            size="xs"
                        />{' '}
                        Active
                    </span>
                )}
                <FontAwesomeIcon
                    icon={faChevronDown}
                    transform={
                        dropdownOpen
                            ? {
                                  rotate: 180,
                              }
                            : {
                                  rotate: 0,
                              }
                    }
                />
            </div>
            {dropdownOpen && (
                <ul className="absolute z-50 w-32 text-sm text-gray-500 bg-white border border-gray-300 rounded-none mt-11">
                    <li className="px-4 py-2 hover:bg-gray-50">
                        <div
                            onClick={() => {
                                setStatus('active')
                                setDropdownOpen(false)
                            }}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="text-maha-green-400"
                                size="xs"
                            />{' '}
                            Active
                        </div>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-50">
                        <div
                            onClick={() => {
                                setStatus('inactive')
                                setDropdownOpen(false)
                            }}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="text-red-500"
                                size="xs"
                            />{' '}
                            Inactive
                        </div>
                    </li>
                </ul>
            )}
        </>
    )
}
