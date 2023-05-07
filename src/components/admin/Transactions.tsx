import { useState } from 'react'
// import { Link } from "react-router-dom"


const Transactions = () =>{

    const [screen, setScreen] = useState('income')

    return(
        <>
            
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Transactions</h3>
                                    
                                </div>
                                <div>
                                    <div className="flex justify-center">
                                        <button className="mx-2">Income</button>
                                        <button className="mx-2">Expense</button>
                                        <button className="mx-2">Refund</button>
                                        <button className="mx-2">Transfar</button>
                                    </div>
                                    
                                    {/* {screen === 'income'? screen==='expense' } */}
                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Income for the month</h3>
                                        <h5>200000</h5>
                                    </div>

                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Income for the year</h3>
                                        <h5>2000000</h5>
                                    </div>

                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Total Income</h3>
                                        <h5>20000000</h5>
                                    </div>

                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Expense for the month</h3>
                                        <h5>1000</h5>
                                    </div>

                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Expense for the year</h3>
                                        <h5>100o00</h5>
                                    </div>

                                    <div className="bg-slate-100 my-3 p-3 rounded">
                                        <h3 className="font-bold text-2xl">Total Expense</h3>
                                        <h5>1000000</h5>
                                    </div>

                                   
                                </div>
                            </div>
                    </section>

        </>
    )
}

export default Transactions