import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Upload } from 'antd'
import Avatar from './Avatar'
import query from '../../../utils/query';
import { CameraOutlined } from '@ant-design/icons'

const AvatarUploader = forwardRef((props, ref) => {
    const [avatarFile, setAvatarFile] = useState()
    const [uploadFile, setUploadFile] = useState()
    const upload = async () => {
        if (uploadFile) {
            const files = []
            files.push(uploadFile)
            const result = await query.upload('file', files)
            if (result?.result.length == 1)
                return result?.result[0]
        }
        return null
    }
    useImperativeHandle(ref, () => ({
        upload
    }))
    useEffect(() => {
        setAvatarFile(props.src)
    }, [props.src])
    return (
        <Upload
            showUploadList={false}
            beforeUpload={(e) => {
                setAvatarFile(URL.createObjectURL(e));
                return false;
            }}
            onChange={(e) => {
                setUploadFile(e.file)
                props.onUpdate()
            }}
        >
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-2 border-base-200 shadow-md hover:shadow-xl">
                <Avatar
                    src={avatarFile}
                    fallbackSrc={'/assets/avatar/default.png'}
                    className="w-24 h-24 rounded-full"
                />
                <div className='bg-black absolute w-full h-full rounded-full bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-80 transition-all flex justify-center items-center'>
                    <CameraOutlined className='text-2xl'/>
                </div>
            </div>
        </Upload>
    )
})

export default AvatarUploader