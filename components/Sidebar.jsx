import Mahalogosmall from './MahaLogoSmall'

export default function Sidebar() {
    return (
        <>
            <aside className="top-0 w-64 h-16 bg-gray-400 sm:w-20">
                <div className="flex justify-center px-3 py-3">
                    <div>
                        <Mahalogosmall width={40} height={40} />
                    </div>
                </div>
                <nav className="flex flex-col">
                    {[
                        ['Home', '/dashboard', 'icon'],
                        ['Team', '/team', 'icon'],
                        ['Projects', '/projects', 'icon'],
                        ['Reports', '/reports', 'icon'],
                    ].map(([title, url]) => (
                        <a
                            href={url}
                            className="px-3 py-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                            {title}
                        </a>
                    ))}
                </nav>
            </aside>
        </>
    )
}
