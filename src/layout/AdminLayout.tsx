import { Outlet } from "react-router-dom"
import AHeader from "../components/admin/utils/AHeader"
import Sidebar from "../components/admin/utils/Sidebar"

const AdminLayout = () => {
    return(
        <>
            <section className="bmd:flex">
                <section id="sidebar" className="basis-2/12 border-r border-white">
                    <Sidebar/>
                </section>
                <section className="basis-10/12">
                    <AHeader/>
                    <Outlet/>
                </section>
            </section>
        </>
    )
}

export default AdminLayout