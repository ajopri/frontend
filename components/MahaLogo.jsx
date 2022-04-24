import Image from 'next/image'
import MahaLogoWhite from '../public/maha-logo-white.png'

export default function Mahalogo({width, height}) {
    

    return (
        <>
            <Image src={MahaLogoWhite} width={width} height={height} />
        </>
    )
}
