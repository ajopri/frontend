import Image from 'next/image'
import Link from 'next/link'
import pathImage from '../../public/maha-logo-white.png'

export default function MahaLogoWhite({ width, height, ...props }) {
    return (
        <Link href="/">
            <a>
                <Image src={pathImage} width={width} height={height} />
            </a>
        </Link>
    )
}
