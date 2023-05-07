import { useField } from 'formik'

interface Props {
    label:string,
    id:string,
    name:string,
    type:string,
}




const MyTel = ({label, ...props}:Props) => {
    const [field, meta] = useField(props);
    return(
        <div>
            <label htmlFor={props.id || props.name}>
                {label}
            </label>
            <div className='flex border bg-slate-50'>
                <span className='pt-2'>
                    +234
                </span>
                <input className="text-input p-2 rounded focus:outline-none w-full bg-slate-50"  {...field} {...props}/>
            </div>
            
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </div>
    )
} 

export default MyTel