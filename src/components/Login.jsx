import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { userSignUp, userSignin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.svg";
import rocketman from "../assets/rocketman.svg";

function Login() {
  const users = ["CUSTOMER", "ENGINEER"];
  const [usertype, setUsertype] = useState("CUSTOMER");
  const [signup, setSignup] = useState(false);
  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function updateLoginData(e) {
    if (e.target.name === "userid") {
      setUserID(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  }

  function loginfn() {
    const data = {
      userId: userId,
      password: password,
    };

    userSignin(data)
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);

        if (response.data.userTypes === "CUSTOMER") {
          navigate("/customer");
        } else if (response.data.userTypes === "ENGINEER") {
          navigate("/engineer");
        } else if (response.data.userTypes === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }

  function signupfn() {
    const data = {
      userId: userId,
      name: username,
      email: email,
      password: password,
      userType: usertype,
    };

    userSignUp(data)
      .then(function (response) {
        if (response.status === 201) {
          setSignup(false);
          setMessage("User Signed Up Successfully...");
        }
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  }

  return (
    <div className="login relative overflow-hidden flex items-center justify-center lg:justify-start h-screen">
      <img
        src={background}
        className="absolute object-cover w-full h-full -z-10"
      />
      <img
        src={rocketman}
        className={`${
          signup
            ? "hidden lg:inline absolute -top-20 -right-60 lg:top-14 w-3/4  h-3/4 -z-10"
            : "-top-28 absolute h-2/3 w-2/3 md:h-1/2 md:w-1/2 lg:-right-60 lg:top-14 lg:w-3/4 lg:h-3/4 -z-10"
        }`}
      />
      <div className="mt-16 lg:mt-0 rounded flex flex-col justify-center gap-y-4 items-center pt-10 pb-6 px-10  bg-gradient-to-b from-purple-300/80 to-purple-300/40 shadow lg:translate-x-60">
        <p className="text-4xl font-bold text-purple-600 text-center mb-0">
          {" "}
          {signup ? "Sign Up" : "Login"}
        </p>

        {signup && (
          <div className="w-72 h-auto">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              User type
            </span>
            <Listbox value={usertype} onChange={(value) => setUsertype(value)}>
              <div className="relative mt-1 h-12">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent py-2 pl-4 pr-10 text-left outline outline-1 outline-gray-400  hover:outline-purple-600 focus:outline-2 focus:outline-purple-600 h-12 text-lg">
                  <span className="block truncate">{usertype}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-purple-300  sm:text-sm outline outline-1 outline-gray-400 text-lg">
                    {users.map((user, userIndex) => (
                      <Listbox.Option
                        key={userIndex}
                        className={({ active }) =>
                          `relative rounded-lg cursor-pointer select-none py-3 pl-10 pr-4 ${
                            active
                              ? "bg-purple-100 text-purple-900"
                              : "text-black"
                          }`
                        }
                        value={user}
                      >
                        <span className="block truncate font-normal text-base">
                          {user}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        )}

        <div className="flex text-start w-72 flex-col">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            User id
          </span>

          <input
            type="text"
            name="userid"
            value={userId}
            onChange={(e) => updateLoginData(e)}
            className="h-12 w-72 rounded-lg px-4 lg:text-lg text-black outline outline-1 outline-gray-400  hover:outline-purple-600 focus:outline-2 focus:outline-purple-600 bg-transparent"
          ></input>
        </div>
        {signup && (
          <div className="flex text-start w-72 flex-col">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </span>

            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => updateLoginData(e)}
              className="h-12 w-72 rounded-lg px-4 lg:text-lg text-black outline outline-1 outline-gray-400  hover:outline-purple-600 focus:outline-2 focus:outline-purple-600 bg-transparent"
            ></input>
          </div>
        )}
        {signup && (
          <div className="flex text-start w-72 flex-col">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </span>

            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => updateLoginData(e)}
              className="h-12 w-72 rounded-lg px-4 lg:text-lg text-black outline outline-1 outline-gray-400  hover:outline-purple-600 focus:outline-2 focus:outline-purple-600 bg-transparent"
            ></input>
          </div>
        )}
        <div className="flex text-start w-72 flex-col">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </span>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => updateLoginData(e)}
            onKeyDown={(e) =>
              e.key === "Enter" ? (signup ? signupfn() : loginfn()) : null
            }
            className="h-12 w-72 rounded-lg px-4 lg:text-lg text-black outline outline-1 outline-gray-400  hover:outline-purple-600 focus:outline-2 focus:outline-purple-600 bg-transparent"
          ></input>
        </div>

        <button
          onClick={signup ? signupfn : loginfn}
          className="bg-purple-600 hover:bg-purple-800 transition-all hover:rounded-lg rounded-xl mt-1 font-semibold text-lg  text-white h-12 w-48"
        >
          {signup ? "Sign Up" : "Login"}
        </button>
        <p
          onClick={() => setSignup(!signup)}
          className="text-base text-purple-600 hover:text-purple-700 -translate-y-1 text-center cursor-pointer "
        >
          {" "}
          {signup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
        <p className={`text-lg font-semibold -translate-y-4 ${message === "User Signed Up Successfully..." ? "text-green-900": "text-red-600"}  `}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default Login;
