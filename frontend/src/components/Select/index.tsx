import React, { ChangeEvent, ChangeEventHandler } from "react"
import "./index.css";

interface SelectOption {
    name: string;
    value: string
}
interface ISelectProps {
    options: SelectOption[],
    selectedOptionCallBack: (value: React.FormEvent<HTMLSelectElement>) => React.ChangeEvent<HTMLSelectElement>,
    additionalStyles:{container:{},select:{}}
}
const Select = ({ options = [], selectedOptionCallBack,additionalStyles }: ISelectProps) => {
    const {container,select}=additionalStyles
    return (
       <div className="select-container" style={{...container}} >
         <select className="select" style={{...select}} name="Select Option" id="select" onChange={selectedOptionCallBack} >
            {options.map(({ name, value }) => (
                <option className="select-item" value={value}>{name}</option>
            ))}
        </select>
       </div>
    )
}

export default Select