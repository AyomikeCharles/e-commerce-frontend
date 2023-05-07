import { useField } from 'formik'

interface Props {
    label:string,
    id:string,
    name:string,
    type:string
}




const MyTextInput = ({label, ...props}:Props) => {
    const [field, meta] = useField(props);
    return(
        <>
            <label htmlFor={props.id || props.name}>
                {label}
            </label>
            <input className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"  {...field} {...props}/>
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </>
    )
} 

export default MyTextInput