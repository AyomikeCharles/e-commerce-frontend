import {
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiSearch,
  FiMenu,
  FiXOctagon,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../..";
import useAuth from "../../res/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import categories from "../../res/categoriesService";
import shuffleArray from "../../res/shuffle";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const { data, isSuccess } = categories.useGetCategories();
  const location = useLocation();

  let random: Cats[] = [];
  if (isSuccess) {
    const shuffled = shuffleArray(data);
    random = shuffled.slice(0, 4);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [cats, setShowCats] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const cartCount = useAppSelector((state) => state.cart);
  const { id, link } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleCartState = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  const navRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    if (navRef.current !== null) {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        navRef.current.style.backgroundColor = "white";
        navRef.current.style.paddingTop = "3px";
        navRef.current.style.paddingBottom = "3px";
        navRef.current.style.boxShadow = "0px 1px 2px 1px #f2f2f2";
      } else {
        navRef.current.style.backgroundColor =
          location.pathname === "/" ? "transparent" : "white";
        navRef.current.style.paddingTop = "1px";
        navRef.current.style.paddingBottom = "1px";
        navRef.current.style.boxShadow = "none";
      }
    }
  };

  const showSearch = () => {
    setShowSearchModal(!showSearchModal);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <nav
        ref={navRef}
        className={`${
          location.pathname === "/" ? "" : "bg-white border-b"
        } flex justify-between py-1 fixed w-full z-20 px-3 transition-all duration-500`}
      >
        <div className="basis-4/12 flex justify-center">
          <Logo />
        </div>

        <div className="basis-4/12 py-6 hidden md:block font-bold">
          <ul className="flex justify-between md:justify-around space-x-3 md:space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li
              className="relative flex"
              onMouseEnter={() => setShowCats(true)}
              onMouseLeave={() => setShowCats(false)}
            >
              <span className="md:flex">
                {" "}
                Categories
                <FiChevronDown size={23} />
              </span>
              <AnimatePresence>
                {cats && (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 40 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute text-base font-normal space-y-3 z-[800] w-[170px] -left-10 md:left-0 p-3 rounded shadow bg-stone-700/90 text-white"
                  >
                    {isSuccess &&
                      random.map((item: Cats) => (
                        <div key={item._id}>
                          <Link to="">{item.title}</Link>
                        </div>
                      ))}
                    <div>
                      <Link to="">More</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        <div className="basis-4/12 py-6">
          <ul className="flex justify-between md:justify-center space-x-5">
            <li onClick={showSearch} className="flex">
              <FiSearch size="22" className="" />{" "}
              <span className="hidden lg:inline"> Search</span>
            </li>
            <li
              onClick={handleCartState}
              className="relative hover:cursor-pointer flex"
            >
              <FiShoppingCart size="22" className="" />
              <span className="absolute -top-2 -right-[2px] lg:right-[25px] w-4 h-4 bg-black text-white text-center text-[9px] rounded-[50%]">
                {cartCount?.totalQty}
              </span>{" "}
              <span className="hidden lg:inline"> Cart</span>
            </li>
            <li>
              {id !== "" ? (
                <Link to={`/${link}`} className="flex">
                  <FiUser size="22" className="" />{" "}
                  <span className="hidden lg:inline"> User</span>
                </Link>
              ) : (
                <Link to="/login" className="flex">
                  <FiUser size="22" className="" />{" "}
                  <span className="hidden lg:inline"> User</span>
                </Link>
              )}
            </li>
            <li
              onClick={() => setShowSideBar(true)}
              className="md:hidden border p-1"
            >
              <FiMenu size="22" className="" />
            </li>
          </ul>
        </div>
      </nav>

      <Cart open={isOpen} changeOpenState={handleCartState} />
      <Menu showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-black text-white fixed top-0 left-0 w-full h-full grid grid-cols-1 content-center z-[10000]"
          >
            <div>
              <div className="flex justify-center my-10">
                <button onClick={showSearch} className="h-10 mx-auro w-2/12">
                  <FiXOctagon size={30} />
                </button>
              </div>
              <form>
                <div className="flex justify-center">
                  <div className="w-10/12 md:w-7/12">
                    <input
                      type="text"
                      value={search}
                      onChange={handleChange}
                      placeholder="search..."
                      className="w-11/12 rounded-l bg-transparent border-b-2 focus:outline-none p-2"
                    />
                    <button onClick={handleSearch} className="w-1/12 h-10">
                      <FiSearch />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
