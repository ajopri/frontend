import { Modal } from '@nextui-org/react'
import Button from '../Button/Button'
import Input from '../Inputs/Input'

export default function ModalActivateAccount({
    visible = false,
    closeHandler,
    submitHandler,
    ...props
}) {
    return (
        <Modal
            closeButton
            width="32%"
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            css={{ paddingTop: 0 }}>
            <Modal.Header
                // autoMargin
                justify="flex-start"
                css={{
                    color: '#434A54',
                    paddingRight: '2rem',
                }}>
                <h1 className="text-lg font-semibold capitalize">
                    activate account?
                </h1>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <p className="pb-3 text-xs">
                        This will send a confirmation email to the customer.
                        After activation, the user can login and view all data
                        of companies below.
                    </p>
                    <div className="flex flex-row">
                        <div className="flex w-full gap-5">
                            <div className="flex-initial w-2/5">
                                <Input
                                    className="text-sm rounded-none"
                                    disabled
                                    value="3M GROUP"
                                    label="Customer Group"
                                />
                            </div>
                            <div className="flex-initial w-3/5">
                                <Input
                                    className="text-sm rounded-none"
                                    disabled
                                    value="johndoe@mmm.com"
                                    label="Email"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow py-3 border-b border-gray-300" />
                    <div className="w-full pt-5">
                        <table className="w-full space-x-3 table-auto">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase">
                                    <th className="w-9/12 pb-1 font-light">
                                        companies
                                    </th>
                                    <th className="w-3/12 pb-1 font-light">
                                        grant access
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-sm">
                                        3M Singapore Pte Ltd
                                    </td>
                                    <td className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked
                                            className="w-4 h-4 checked:accent-maha-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sm">
                                        3M Asia Pacific Ltd (SGD)
                                    </td>
                                    <td className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked
                                            className="w-4 h-4 checked:accent-maha-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-sm">
                                        3M Innovation Singapore Ltd (SGD)
                                    </td>
                                    <td className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked
                                            className="w-4 h-4 checked:accent-maha-500"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer justify="flex-end">
                <div className="flex py-2 space-x-2">
                    <Button
                        type="button"
                        onClick={closeHandler}
                        className="px-5 py-2 text-white bg-gray-600 rounded hover:opacity-50">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        // onClick={closeHandler}
                        className="px-5 py-2 text-white rounded bg-btn-accordion hover:opacity-50">
                        Activate
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
