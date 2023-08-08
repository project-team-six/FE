import { ChangeEvent } from 'react'

export const FeedInput = ({label, value, setValue}: {label: string, value: string, setValue: (value: string) => void }) => {
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return (
        <div>
            <label>{label}</label>
            <input type="text" required value={value} onChange={handleChangeValue}/>
        </div>
    )
}