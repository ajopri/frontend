import { Pagination } from '@nextui-org/react'

export default function Paginate() {
    return (
        <Pagination
            total={20}
            initialPage={1}
            color="secondary"
            size="sm"
            loop
            shadow
            siblings={2}
            noMargin
        />
    )
}
