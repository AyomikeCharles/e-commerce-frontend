import { useField } from 'formik'
import { ReactNode } from 'react'


interface Props {
    children:ReactNode
    id:string,
    name:string
}


const MyCheckbox = ({children, ...props}:Props) => {
    const [field, meta] = useField({...props, type:'checkbox'});
    return(
        <div>
            <label className='checkbox-input'>
                <input type='checkbox' className='mr-2' {...field} {...props}/>
                
                {children}
            </label>
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </div>
    )
} 

export default MyCheckbox 