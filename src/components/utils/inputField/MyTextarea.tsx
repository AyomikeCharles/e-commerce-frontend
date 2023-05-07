import { useField } from 'formik'
import { ReactNode } from 'react'

interface Props {
    children:ReactNode,
    label:string,
    id:string,
    name:string
}


const MyTextarea = ({children, label, ...props}:Props) => {
    const [field, meta] = useField(props);
    return(
        <>
            <label htmlFor={props.id || props.name}>
                {label}
            </label>
            <textarea {...field} {...props} className='border p-2 rounded focus:outline-none w-full bg-slate-50'>{children}</textarea>
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </>
    )
} 

export default MyTextarea