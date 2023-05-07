import Spinner from "./Spinner"

interface Props {
   spinner:boolean
   value:string
}

const Botton = ({spinner, value}:Props) => {
    return(
        <div className="flex justify-center">
            <button type="submit" className="mt-5 bg-lime-500 p-3 rounded inline-flex"> {spinner ? <Spinner/> : null } {value}</button>
        </div>
    )
}

export default Botton