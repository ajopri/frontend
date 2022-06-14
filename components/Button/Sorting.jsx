import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Sorting({ handleClick, className, children }) {
    return (
        <div
            onClick={handleClick}
            className={`${className} cursor-pointer sort`}>
            {children}
        </div>
    )
}
