import { Outlet } from "react-router-dom"
import AHeader from "../components/admin/utils/AHeader"
import Sidebar from "../components/admin/utils/Sidebar"

const AdminLayout = () => {
    return(
        <>
            <section className="bmd:flex">
                <section id="sidebar" className="basis-3/12">
                    <Sidebar/>
                </section>
                <section className="basis-9/12">
                    <AHeader/>
                    <Outlet/>
                </section>
            </section>
        </>
    )
}

export default AdminLayout