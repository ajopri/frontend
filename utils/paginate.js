/* eslint-disable import/prefer-default-export */
import _ from 'lodash'

export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}
