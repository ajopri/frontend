import '../styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'

const progress = new ProgressBar({
    size: 3,
    color: '#8CC73F',
    className: 'bar-of-progress',
    delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}
