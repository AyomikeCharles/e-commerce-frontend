
interface Props {
    total:number,
    next:(val:number)=>void,
    page:number,
    limit:number
}

const Pagination = ({total, next, page, limit}:Props) => {



  return (
    <>

                    <div className="font-bold">
                        <button  onClick={()=>next(1)} className="border-lime-500 border px-2 py-1 my-3 mx-1 rounded hover:bg-lime-500 hover:text-white" disabled = {page === 1 ? true : false}> {`<<`} </button>
                        <button onClick={()=>next(page-1)} className="border-lime-500 border px-2 py-1 my-3 mx-1 rounded hover:bg-lime-500 hover:text-white" disabled = {page === 1 ? true : false}>{`<`}</button>
                        {
                           Array(Math.ceil(total/limit)).fill(0).map((_,i)=>{
                            const current = i+1
                           
                        
                                
                                    if(page < 5){
                                        if(current <= 5){
                                        return(
                                            <button onClick={()=>next(current)} className="border-lime-500 border font-normal px-2 py-1 my-3 mx-1 rounded hover:bg-lime-500 hover:text-white" key={i+1}>{i+1}</button>
                                           )
                                        }
                                    }else{
                                       if(current >= page && current < page+3){
                                        return(
                                            <button onClick={()=>next(current)} className="border-lime-500 border font-normal px-2 py-1 my-3 mx-1 rounded hover:bg-lime-500 hover:text-white" key={i+1}>{i+1}</button>
                                           )
                                       }
                                    }
                                    
                                
                                
                                return null
                        
                           
                        })
                        }
                        <button disabled = {page === Math.ceil(total/limit) ? true : false} onClick={()=>next(page+1)} className="border-lime-500 border px-2 py-1 my-3 mx-1 rounded hover:bg-lime-500 hover:text-white">{`>`}</button>
                        <button disabled = {page === Math.ceil(total/limit) ? true : false} onClick={()=>next(Math.ceil(total/limit))} className="border-lime-500 border hover:bg-lime-500 hover:text-white px-2 py-1 my-3 mx-1 rounded">{`>>`}</button>
                    </div>
    </>
  )
}

export default Pagination