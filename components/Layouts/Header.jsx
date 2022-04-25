import { faBell, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    const today = new Date()
    const formatDate = dateString => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    return (
        <header className="h-16 shadow z-10 py-2 px-4 flex justify-between text-xs text-gray-500">
            <div className="ml-12 my-auto">
                {/* Search */}
                <div className="px-4 flex items-center justify-between pl-10 sm:visible invisible">
                    <span className="absolute text-gray-500">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </span>
                    <input
                        placeholder="Search anything"
                        className="w-full px-3 py-2 pl-7 placeholder-gray-400 focus:outline-none"
                    />
                </div>
            </div>
            <div className="my-auto">
                <div className="flex items-center">
                    {/* Date */}
                    <div className="px-4 hidden sm:block">
                        {formatDate(today)}
                    </div>

                    {/* Notification */}
                    <div className="px-4">
                        <FontAwesomeIcon icon={faBell} />
                    </div>

                    {/* navbar user */}
                    <div className="pr-4 flex items-center space-x-4">
                        <span className="rounded-full bg-gray-100 px-3 py-2">
                            <FontAwesomeIcon icon={faUser} />
                        </span>{' '}
                        <span className="hidden sm:block">
                            Achmad Joko Priyono
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
