import { Link } from "react-router-dom";
import shopping from "./utils/images/shopping.jpg";
import { useAppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import { login } from "../slicer/authSlice";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botton from "./utils/Botton";
import { AxiosError } from "axios";
import authService from "../res/authservice";
import { useMutation } from "react-query";
import Logo from "./utils/Logo";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    whatsapp: "",
    tandc: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };


  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setFormData((prev) => ({ ...prev, tandc: checked }));

  };

  const mutation = useMutation({
    mutationFn: (data: signUpForm) => {
      setLoading(true);
      return authService.signup(data);
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
    if (!formData.email || !formData.password || !formData.phoneNumber || !formData.fullName || formData.tandc===false) {
      toast("please fill all field");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <>
      <section className="">
        <div className="md:flex">
          <div className="basis-1/2 py-16">
            <form onSubmit={handleSubmit}>
              <div className="w-10/12 md:w-8/12 mx-auto">
                <div className="flex justify-center">
                    <Logo/>
                </div>
                <h3 className="font-bold text-2xl my-3">! Hello </h3>
                <p className="mt-3 mb-6">Create New Customer Account</p>
                <div className="my-3">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>
                <div className="my-3">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>

                <div className="my-3">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>

                <div className="my-3">
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>

                <div className="my-3">
                  <input
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                  />
                </div>

                <div>
                  <input type="checkbox" onChange={handleCheck} /> i agree to
                  the{" "}
                  <Link
                    className="text-lime-500 hover:text-lime-700 transition duration-500"
                    to=""
                  >
                    terms and condition
                  </Link>
                </div>

                <div className="flex justify-start">
                  <Botton spinner={loading} value="Sign Up" />
                </div>
              </div>
            </form>

            <div className="w-8/12 mt-5 mx-auto text-center">
              Already a member?{" "}
              <Link
                to="/login"
                className="hover:text-lime-500 transition duration-500"
              >
                {" "}
                Sign in
              </Link>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${shopping})` }}
            className="basis-1/2 relative bg-no-repeat bg-cover bg-center hidden md:block"
          >
            <div className="h-full w-full pb-10 pt-[30%] md:pt-[50%]">
              <div className="text-center">
                <h4 className="text-2xl font-bold">
                  Get Access to your Order, wishlist and lots more.
                </h4>
                <h4 className="text-1xl font-bold mb-6">Already a member</h4>
                <div>
                  <Link
                    to="/login"
                    className="bg-lime-500 p-3 rounded text-white"
                  >
                    Login Here
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

export default SignUp;
