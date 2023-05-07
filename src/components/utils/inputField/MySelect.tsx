import { useField } from 'formik'
import { ReactNode } from 'react'

interface Props {
    children:ReactNode,
    label:string,
    id:string,
    name:string,
}


const MySelect = ({children, label, ...props}:Props) => {
    const [field, meta] = useField(props);
    return(
        <>
            <label htmlFor={props.id || props.name}>
                {label}
            </label>
            <select className="border p-2 rounded focus:outline-none w-full bg-slate-50" {...field} {...props}>
                {children}
            </select>
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </>
    )
} 

export default MySelect