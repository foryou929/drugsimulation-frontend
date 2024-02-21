import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '../../features/common/headerSlice'
import { Table, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment'
import TitleCard from '../../components/Cards/TitleCard'
import query from '../../utils/query'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'

const { Column } = Table;

function Result() {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "result" }))
    }, [])

    const [PKS, set_PKS] = useState([]);
    const [AES, set_AES] = useState([]);

    useEffect(() => {
        query.get('/PKS', (res) => {
            set_PKS(res.result);
        });
        query.get('/AES', (res) => {
            set_AES(res.result);
        }, [])
    }, [])

    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);

    const [search1, setSearch1] = useState('');
    const [search2, setSearch2] = useState('');

    useEffect(() => {
        setTableData1(PKS.filter(row => (row.name.indexOf(search1) >= 0 || moment(row.createdAt).format('YYYY-MM-DD HH:mm').indexOf(search1) >= 0)).map(row => {
            return {
                ...row, key: row._id, action:
                    <div className='flex gap-2'>
                        <EyeIcon className='w-4 h-4 cursor-pointer' onClick={() => { window.location.href = `/app/PKS?_id=${row._id}` }} />
                        <TrashIcon className='w-4 h-4 text-red-500 cursor-pointer' onClick={() => {
                            query.delete('/PKS/' + row._id)
                            set_PKS(PKS.filter(({ _id }) => _id != row._id));
                        }} />
                    </div>,
                datetime: moment(row.createdAt).format('YYYY-MM-DD HH:mm')
            }
        }))
    }, [PKS, search1])

    useEffect(() => {
        setTableData2(AES.filter(row => (row.name.indexOf(search2) >= 0 || moment(row.createdAt).format('YYYY-MM-DD HH:mm').indexOf(search2) >= 0)).map(row => {
            return {
                ...row, key: row._id, action:
                    <div className='flex gap-2'>
                        <EyeIcon className='w-4 h-4 cursor-pointer' onClick={() => { window.location.href = `/app/AES?_id=${row._id}` }} />
                        <TrashIcon className='w-4 h-4 text-red-500 cursor-pointer' onClick={() => {
                            query.delete('/AES/' + row._id);
                            set_AES(AES.filter(({ _id }) => _id != row._id));
                        }} />
                    </div>,
                datetime: moment(row.createdAt).format('YYYY-MM-DD HH:mm')
            }
        }));
    }, [AES, search2])

    return (
        <div className='flex gap-4 flex-wrap lg:flex-nowrap'>
            <TitleCard className="flex-grow" title={"Anesthetic Effect"}>
                <Input addonBefore={<SearchOutlined />} onChange={(e) => setSearch2(e.target.value)} />
                <Table bordered scroll={{ x: 'auto' }} dataSource={tableData2} className='mt-4'>
                    <Column title={t('datetime')} dataIndex="datetime" key="datetime" />
                    <Column title={t('name')} dataIndex="name" key="name" />
                    <Column title={``} dataIndex="action" key="action" />
                </Table>
            </TitleCard>
            <TitleCard className="flex-grow" title={"PK Simulation"}>
                <Input addonBefore={<SearchOutlined />} onChange={(e) => setSearch1(e.target.value)} />
                <Table bordered scroll={{ x: 'auto' }} dataSource={tableData1} className='mt-4'>
                    <Column title={t('datetime')} dataIndex="datetime" key="datetime" />
                    <Column title={t('name')} dataIndex="name" key="name" />
                    <Column title={``} dataIndex="action" key="action" />
                </Table>
            </TitleCard>
        </div >
    )
}

export default Result