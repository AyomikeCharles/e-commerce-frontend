import { Link } from "react-router-dom";
import shopping from "./utils/images/shopping.jpg";
import { AxiosError } from "axios";
import { useAppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import { login } from "../slicer/authSlice";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import authService from "../res/authservice";
import Botton from "./utils/Botton";
import Logo from "./utils/Logo";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: (data: FormDataLogin) => {
      setLoading(true);
      return authService.login(data);
    },

    onSuccess: (data) => {
      dispatch(login(data));
      navigate("/user");
      setLoading(false);
    },
    onError: (error: AxiosError) => {
      if (error?.response) {
        //handle response error
        toast("response error");
      } else {
        //handle request error
        toast.error("request error");
      }
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast("please fill all field");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <>
      <section className="">
        <div className="md:flex">
          <div className="basis-1/2 mt-24 md:mt-0 md:grid md:grid-cols-1 md:content-center">
            <div className="flex justify-center">
              <Logo />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mx-auto w-10/12 md:w-9/12">
                <h3 className="font-bold text-2xl my-3">! Welcome Back </h3>
                <p className="mt-3 mb-6">Sign in to your Account</p>
                <div className="my-5">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>

                <div className="my-5">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>
                <div className="text-right">
                  <Link to="/forgetpassword">forget password</Link>
                </div>

                <div className="flex justify-start">
                  <Botton value="Submit" spinner={loading} />
                </div>
              </div>
            </form>

            <div className="w-8/12 mt-5 mx-auto text-center">
              not a member?{" "}
              <Link
                to="/signup"
                className="hover:text-lime-500 transition duration-500"
              >
                {" "}
                Sign up
              </Link>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${shopping})` }}
            className="basis-1/2 relative bg-no-repeat bg-cover bg-center hidden md:block h-screen"
          >
            <div className=" h-full w-full grid grid-col-1 content-center">
              <div className="text-center">
                <h4 className="text-2xl font-bold">
                  Get Access to your Order, wishlist and lots more.
                </h4>
                <h4 className="text-1xl font-bold mb-6">Become a member</h4>
                <div>
                  <Link
                    to="/signup"
                    className="bg-lime-500 p-3 rounded text-white"
                  >
                    Join Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
