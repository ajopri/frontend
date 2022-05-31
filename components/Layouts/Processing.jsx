import { Loading } from '@nextui-org/react'

export default function Processing() {
    return (
        <div className="flex justify-center items-center">
            <Loading
                color="secondary"
                size="sm"
                type="points"
                textColor="secondary">
                Processing
            </Loading>
        </div>
    )
}
