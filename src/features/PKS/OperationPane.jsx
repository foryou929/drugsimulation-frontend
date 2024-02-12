import { InputNumber, Select } from "antd"

const OperationPane = ({ operations, setOperations, startTime, unit, ...rest }) => {
    const onClick = () => {
        setOperations([...operations, { type: 0, value: 0.0, time: 0 }])
    }
    const onRemove = (index) => {
        setOperations(operations.filter((v, i) => i != index))
    }
    const setTime = (index, value) => {
        const newOperations = [...operations];
        newOperations[index].time = value;
        setOperations(newOperations);
    }
    const setValue = (index, value) => {
        const newOperations = [...operations];
        newOperations[index].value = value < 0 ? 0 : value;
        setOperations(newOperations);
    }
    const setType = (index, value) => {
        const newOperations = [...operations];
        newOperations[index].type = value;
        setOperations(newOperations);
    }
    return (
        <div className="w-full" {...rest}>
            {
                operations.map((operation, index) => {
                    return <div key={index} className="w-full flex flex-wrap gap-2 mt-4 items-center">
                        {
                            index > 0 && <Select
                                options={[
                                    { value: 0, label: 'Continuous' },
                                    { value: 1, label: 'Bolus' }
                                ]}
                                value={operation.type}
                                onChange={(v) => setType(index, v)}
                            />
                        }
                        {
                            index > 0 &&
                            <InputNumber
                                className="w-40"
                                defaultValue={operation.time}
                                onChange={(time) => setTime(index, time)}
                                addonBefore={startTime.add(operation.time, 'minutes').format('hh:mm')}
                                suffix={'min'}
                            />
                        }
                        <InputNumber
                            className="flex-grow"
                            defaultValue={operation.value}
                            onChange={(value) => setValue(index, value)}
                            addonBefore={index == 0 && "Initial"}
                            suffix={unit[operation.type]}
                            value={operation.value}
                        />
                        {
                            index > 0 && <button className="flex-none" onClick={() => onRemove(index)}>
                                <img className="w-4 h-4" src="/assets/img/remove.png" />
                            </button>
                        }
                    </div>
                })
            }
            <button
                className="mt-4 w-full py-1 border-dashed border border-gray-500 rounded-full flex justify-center dark:bg-[#2A323C]"
                onClick={onClick}
            >
                <img className="w-4 h-4" src="/assets/img/plus.png" />
            </button>
        </div>
    )
}

export default OperationPane