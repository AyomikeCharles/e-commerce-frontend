import Spinner from "./Spinner"

interface Props {
   spinner:boolean
   value:string
}

const Botton = ({spinner, value}:Props) => {
    return(
        <div className="flex justify-center">
            <button type="submit" className="mt-5 px-3 py-2 rounded text-white inline-flex bg-lime-500"> {spinner ? <Spinner/> : null } {value}</button>
        </div>
    )
}

export default Botton