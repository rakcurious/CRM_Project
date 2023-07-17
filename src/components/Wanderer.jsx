import { useNavigate } from "react-router-dom";
import spacemoon from "../assets/spacemoon.svg";

function Wanderer() {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <>
      <div class="relative h-screen overflow-hidden bg-indigo-900">
        <img src={spacemoon} class="absolute object-cover w-full h-full" />
        <div class="absolute inset-0 bg-black opacity-25"></div>
        <div class="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-32">
          <div class="relative z-10 flex flex-col items-center w-full font-mono">
            <h1 class="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
              You're alone here
            </h1>
            <button
              onClick={back}
              className="text-xl text-white font-extrabold rounded-lg h-14 w-44 bg-pink-700 mt-6 hover:bg-pink-600 transition duration-500 hover:-translate-y-1"
            >
              Go Back
            </button>
            <p class="font-extrabold text-white text-8xl my-32 animate-bounce">
              404
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wanderer;
