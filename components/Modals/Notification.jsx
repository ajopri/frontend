/* eslint-disable react/no-danger */
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function createMarkup(text) {
    return { __html: text }
}

export default function Notification({ status, message, ...props }) {
    return (
        <div className={`${!props.notif ? 'hidden' : ''} relative`}>
            <div
                className="bg-white text-gray-700 px-4 py-3 rounded w-full mr-4 absolute shadow-lg flex flex-row text-sm border-l-8 border-maha-green-300"
                role="alert">
                <span className="top-0 bottom-0 left-0 pr-4 flex justify-center items-center text-maha-green-300">
                    <FontAwesomeIcon icon={faCheckCircle} size="xl" />
                </span>
                <div className="flex flex-col">
                    <strong className="font-bold">{status}!</strong>
                    <span
                        className="block sm:inline"
                        dangerouslySetInnerHTML={createMarkup(message)}
                    />
                </div>
                <span className="absolute top-0 bottom-0 right-0 px-4 flex justify-center items-center">
                    <svg
                        className="fill-current h-6 w-6 text-gray-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span>
            </div>
        </div>
    )
}
