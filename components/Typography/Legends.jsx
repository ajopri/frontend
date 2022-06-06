import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Legends() {
    return (
        <ul className="list-outside list-none text-xs w-max py-1 px-2 bg-gray-100">
            <li className="text-hijau hover:opacity-70">
                <FontAwesomeIcon icon={faSquare} />{' '}
                <span className="text-gray-600">Not Due</span>
            </li>
            <li className="text-kuning hover:opacity-70">
                <FontAwesomeIcon icon={faSquare} />{' '}
                <span className="text-gray-600">0-30 days</span>
            </li>
            <li className="text-jingga hover:opacity-70">
                <FontAwesomeIcon icon={faSquare} />{' '}
                <span className="text-gray-600">31-60 days</span>
            </li>
            <li className="text-pink hover:opacity-70">
                <FontAwesomeIcon icon={faSquare} />{' '}
                <span className="text-gray-600">61-90 days</span>
            </li>
            <li className="text-merah hover:opacity-70">
                <FontAwesomeIcon icon={faSquare} />{' '}
                <span className="text-gray-600">90+ days</span>
            </li>
        </ul>
    )
}
