import { Outlet } from "react-router-dom"
import Nav from "../components/users/utils/Nav"
import Aside from "../components/users/utils/Aside"

const UserLayout = () => {
    return(
        <>
            <section className="bmd:flex">
                <section id="sidebar" className="basis-2/12 border-r border-white">
                    <Aside/>
                </section>
                <section className="basis-10/12">
                    <Nav/>
                    <Outlet/>
                </section>
            </section>
        </>
    )
}

export default UserLayout