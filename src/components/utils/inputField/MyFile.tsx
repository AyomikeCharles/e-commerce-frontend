import { useField } from 'formik'

interface Props {
    label:string,
    id:string,
    name:string,
    multiple:boolean
}




const MyFile = ({label, ...props}:Props) => {
    const [field, meta, helpers] = useField(props);
    const {value, ...rest} = field

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(props.multiple === true){
            const file = event.currentTarget.files;
            helpers.setValue(file);
        }else{
            const file = event.currentTarget.files && event.currentTarget.files[0];
            helpers.setValue(file);
        }
        
      };
    


    return(
        <>
            <label htmlFor={props.id || props.name}>
                {label}
            </label>
            <input type='file' accept='image/*' {...rest} {...props} onChange={(e)=>{handleChange(e)}} className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"/>
            {meta.touched && meta.error? (
                <div className="error text-red-600">{meta.error}</div>
            ):null}
        </>
    )
} 

export default MyFile