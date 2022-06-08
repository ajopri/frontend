import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Spacer } from '@nextui-org/react'
import { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Inputs/Input'

export default function ModalEditUser({ visible, closeHandler, ...props }) {
    console.log(visible)
    const [isVisible, setIsVisible] = useState(visible)

    // const closeHandler = () => {
    //     setIsVisible(false)
    //     console.log('closed')
    // }
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
                    autoMargin
                    justify="flex-start"
                    css={{ background: '#EBEFF5', color: '#434A54' }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <Spacer />{' '}
                    <h1 className="font-semibold text-lg">
                        MANAGE COMPANY ACCOUNTS
                    </h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="container p-4">
                        <div className="flex flex-row">
                            <div className="w-2/3 border-r-2 border-gray-300 pr-5">
                                <h2 className="font-semibold text-gray-600 pb-3">
                                    Set default email
                                </h2>
                                <div className="flex gap-4">
                                    <div className="flex-initial w-1/3">
                                        <Input
                                            disabled
                                            value=""
                                            label="Customer Group"
                                        />
                                    </div>
                                    <div className="flex-initial w-2/3">
                                        <div
                                            for="emails"
                                            className="pb-2 text-gray-500 uppercase text-xs">
                                            Select an option
                                        </div>
                                        <select
                                            id="emails"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300">
                                            <option selected>
                                                Choose a email
                                            </option>
                                            <option value="US">
                                                United States
                                            </option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 pl-5">
                                <h2 className="font-semibold text-gray-600 pb-3">
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
                                <h2 className="font-semibold text-gray-600 pb-3">
                                    Set default email
                                </h2>
                                <div className="flex gap-4">
                                    <div className="flex-initial w-1/12">
                                        <Input
                                            disabled
                                            value=""
                                            label="Customer Group"
                                        />
                                    </div>
                                    <div className="flex-initial w-2/3">
                                        <div
                                            for="emails"
                                            className="pb-2 text-gray-500 uppercase text-xs">
                                            Select an option
                                        </div>
                                        <select
                                            id="emails"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300">
                                            <option selected>
                                                Choose a email
                                            </option>
                                            <option value="US">
                                                United States
                                            </option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer justify="flex-end">
                    <div className="flex p-4">
                        <Button
                            type="button"
                            className="bg-gray-600 text-white hover:opacity-50 rounded py-1 px-3">
                            Cancel
                        </Button>
                        <Spacer />
                        <Button
                            type="submit"
                            className="bg-btn-accordion text-white hover:opacity-50 rounded py-1 px-3">
                            save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
