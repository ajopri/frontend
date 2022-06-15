import { Modal } from '@nextui-org/react'
import Button from '../Button/Button'

export default function ModalRequestInvoice({
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
                    Submit request?
                </h1>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <p className="pb-3 text-xs">
                        An e-invoice document for <strong>{props.invNo}</strong>{' '}
                        will be requested to our customer care and sent to your
                        email in 1-2 working days.
                    </p>
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
                        Submit
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
