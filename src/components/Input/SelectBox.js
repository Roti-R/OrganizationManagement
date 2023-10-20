
import axios from 'axios'
import capitalize from 'capitalize-the-first-letter'
import React, { useState, useEffect } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'


function SelectBox(props) {

    const { labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateFormValue, nameKey } = props

    const [value, setValue] = useState(defaultValue || (options.length > 0 ? options[0][nameKey] : '2222'))

    useEffect(() => {
        console.log(labelTitle);
        console.log(options);
        updateFormValue(value)
    }, [])

    const updateValue = (newValue) => {
        setValue(newValue)
        updateFormValue(newValue)
    }


    return (
        <div className={`inline-block ${containerStyle}`}>
            <label className={`label  ${labelStyle}`}>
                <div className="label-text ">{labelTitle}
                    {labelDescription && <div className="tooltip tooltip-right" data-tip={labelDescription}><InformationCircleIcon className='w-4 h-4' /></div>}
                </div>
            </label>

            <select className="select select-bordered w-full " value={value} onChange={(e) => updateValue(e.target.value)}>
                <option value="PLACEHOLDER" className='text-fuchsia-500 font-bold'>{placeholder}</option>
                {
                    options.map((o) => {
                        return <option value={o[nameKey]} key={o[nameKey]}> {o.name}</option>
                    })
                }
            </select>
        </div >
    )
}

export default SelectBox
