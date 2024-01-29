import { useEffect, useState } from "react"

const Avatar = ({ src, fallbackSrc, className }) => {
    const [imgSrc, setImgSrc] = useState(src)
    useEffect(() => {
        setImgSrc(src)
    }, [src])
    return <img className={`w-16 h-16 ${className} object-cover`} src={imgSrc?.length > 0 ? imgSrc : 'avatar.png'} onError={() => setImgSrc(fallbackSrc)} />
}

export default Avatar