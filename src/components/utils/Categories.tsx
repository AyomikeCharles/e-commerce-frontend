import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import categories from "../../res/categoriesService";
import shuffleArray from "../../res/shuffle";

const ThreeRandomCategories = (): JSX.Element => {
  const { data, isLoading, error, isSuccess, isError } = categories.useGetCategories();

  let randomData: Cats[] = [];

  if (isSuccess) {
    const shuffledArray = shuffleArray(data);

    randomData = shuffledArray.slice(0, 3);
  }

  return (
    <>
      <section className="py-20 mx-5 md:mx-10">
        <div className="md:flex md:space-x-5 justify-center">
          {isSuccess &&
            randomData?.map((cats: Cats) => (
              <div className="rounded p-2 border my-3" key={cats._id}>
                <img
                  src={cats.icon}
                  className="w-[13rem] h-[12rem] mx-auto"
                  alt=""
                />

                <p className="text-lg font-bold">{cats.title}</p>
                <Link to={`/category/${cats._id}`} className="group">
                  Shop Now
                  <div className="border-b-2 max-w-[40px] transition-all border-black duration-1000 group-hover:max-w-[80px]"></div>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default ThreeRandomCategories;
