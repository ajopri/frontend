import Image from 'next/image'
import MahaLogoSmall from '../../public/maha-logo-small.svg'

export default function Mahalogosmall({ width, height }) {
    return <Image width={width} height={height} src={MahaLogoSmall} />
}
