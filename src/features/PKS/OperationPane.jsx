import { InputNumber } from "antd"
import dayjs from "dayjs"

const format = 'HH:mm';

const OperationPane = ({ operations, setOperations, ...rest }) => {
    const onClick = () => {
        setOperations([...operations, { value: 0.0, time: 0 }])
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
        newOperations[index].value = value;
        setOperations(newOperations);
    }
    return (
        <div className="w-full" {...rest}>
            {
                operations.map((operation, index) => {
                    return <div key={index} className="w-full flex gap-2 mt-4">
                        {
                            index > 0 &&
                            <InputNumber
                                className="w-full"
                                defaultValue={operation.time}
                                onChange={(time) => setTime(index, time)}
                            />
                        }
                        <InputNumber
                            prefix={index == 0 && "Initial:"}
                            defaultValue={operation.value}
                            className="w-full"
                            onChange={(value) => setValue(index, value)}
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