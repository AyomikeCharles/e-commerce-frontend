import { Link } from "react-router-dom"
import sales from "../../res/salesService"
import users from "../../res/userService"
import { Info } from "../users/Orders"
import { User } from "./Users"
import products from "../../res/productService"


const AdminDahboard = () =>{

    const { data } = sales.useGetSales(4, 0, '')
    const { data:cData } = sales.useGetCompleteSales(4, 0, '')
    const { data:userData } = users.useGetUsers(4, 0, '')
    const {data:pData } = products.useGetProductsBySearch(4, 0, '')
    const info = pData as DataObject;

    return(
        <>
            
            <section id="content">
                <div className="px-5 py-10">
                    <h3 className="text-2xl font-bold">Dashboard</h3>
                        <div className="mt-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="bg-white shadow rounded p-5">
                                    complete sales
                                    <br/>
                                    {cData?.total}
                                </div>
                                <div className="bg-white shadow rounded p-5">
                                    total sale
                                    <br/>
                                    {data?.total}
                                </div>
                                <div className="bg-white shadow rounded p-5">
                                    total user
                                    <br/>
                                    {userData?.totalUsers}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                <div className="bg-white rounded shadow p-3">
                                    <h3 className="mb-2">New Orders</h3>
                                    {
                                        data?.data?.map((order:Info, i:number)=>(
                                                    <div key={i} className="flex justify-between bg-slate-100 rounded p-3 mb-2">
                                                        <div>
                                                            id:{order._id.slice(-6)}
                                                        </div>
                                                        <div>
                                                            {order.createdAt.slice(0, 10)}
                                                        </div>
                                                    </div>
                                                ))
                                    }
                                    <div>
                                        <Link to='orders'>see all</Link>
                                    </div>                    
                                </div>



                                <div className="bg-white rounded shadow p-3">
                                    <h3 className="mb-2">New Users</h3>
                                    {
                                        userData?.data?.map((user:User, i:number)=>(
                                                    <div key={i} className="flex justify-between bg-slate-100 rounded p-3 mb-2">
                                                        <div>
                                                            {user.fullName}
                                                        </div>
                                                        <div>
                                                            {user.createdAt.slice(0, 10)}
                                                        </div>
                                                    </div>
                                                ))
                                    }
                                    <div>
                                        <Link to='users'>see all</Link>
                                    </div>                    
                                </div>

                                
                               
                            </div>





                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                            <div className="bg-white rounded shadow p-3">
                                    <h3 className="mb-2">New Invoice</h3>
                                    {
                                        cData?.data?.map((order:Info, i:number)=>(
                                                    <div key={i} className="flex justify-between bg-slate-100 rounded p-3 mb-2">
                                                        <div>
                                                            id:{order._id.slice(-6)}
                                                        </div>
                                                        <div>
                                                            {order.createdAt.slice(0, 10)}
                                                        </div>
                                                    </div>
                                                ))
                                    }
                                    <div>
                                        <Link to='invoice'>see all</Link>
                                    </div>                    
                                </div>

                                <div className="bg-white rounded shadow p-3">
                                    <h3 className="mb-2">New Products</h3>
                                    {
                                        info?.data?.map(product => (
                                            <div key={product._id} className="flex justify-between bg-slate-100 rounded p-3 mb-2">
                                                <div>
                                                    <img src={product.images[0]} alt="" loading="lazy" width={40} height={40}/>
                                                </div>
                                                <div>
                                                    {product.title}
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <Link to="products">see all</Link>
                                    </div>
                                </div>
                            </div>
                                    
                        </div>
                    </div>
            </section>
                
        </>
    )
}

export default AdminDahboard