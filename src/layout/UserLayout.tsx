import { Outlet } from "react-router-dom"
import Nav from "../components/users/utils/Nav"
import Aside from "../components/users/utils/Aside"

const UserLayout = () => {
    return(
        <>
            <section className="bmd:flex">
                <section id="sidebar" className="basis-3/12">
                    <Aside/>
                </section>
                <section className="basis-9/12">
                    <Nav/>
                    <Outlet/>
                </section>
            </section>
        </>
    )
}

export default UserLayout