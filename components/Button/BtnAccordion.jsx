import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'

export default function BtnAccordion({ children, ...props }) {
    const classes = `inline-flex items-center rounded py-2 px-2 font-bold ${
        props.expand
            ? 'bg-btn-accordion text-white hover:opacity-75'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-300'
    }`
    return (
        <Tooltip content="Details" placement="left">
            <button type="button" className={classes} onClick={props.onClick}>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    transform={props.expand ? { rotate: 180 } : { rotate: 0 }}
                />
            </button>
        </Tooltip>
    )
}
