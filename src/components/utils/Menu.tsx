import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import categories from "../../res/categoriesService";
import shuffleArray from "../../res/shuffle";
import { FiChevronDown, FiXOctagon } from "react-icons/fi";
import { useState } from "react";

interface Props {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
}

const Menu = ({ showSideBar, setShowSideBar }: Props) => {
  const { data, isSuccess } =
    categories.useGetCategories();
  const [cats, setShowCats] = useState(false);

  let random: Cats[] = [];
  if (isSuccess) {
    const shuffled = shuffleArray(data);
    random = shuffled.slice(0, 4);
  }

  return (
    <>
      <AnimatePresence>
        {showSideBar && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="bg-black text-white fixed top-0 left-0 w-[80%] h-full z-[10000]"
          >
            <div className="flex justify-end p-3">
              <button onClick={() => setShowSideBar(false)}>
                <FiXOctagon size={25} />
              </button>
            </div>

            <div className="font-bold p-4">
              <ul>
                <li className="mb-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/products">Products</Link>
                </li>
                <li className="mb-2">
                  <Link to="/">About</Link>
                </li>
                <li className="mb-2">
                  <Link to="/">Contact</Link>
                </li>
                <li
                  className="relative flex"
                  onClick={() => setShowCats(!cats)}
                >
                  <span className="flex">
                    {" "}
                    Categories
                    <FiChevronDown size={23} />
                  </span>
                  <AnimatePresence>
                    {cats && (
                      <motion.div
                        key="show"
                        initial={{ y: 0 }}
                        animate={{ y: 40 }}
                        exit={{opacity:0, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute text-base font-normal space-y-3 z-[800] w-[170px] left-0 p-3 rounded shadow bg-stone-700/90 text-white"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
