import { useNavigate } from "react-router-dom";
import landscape from "../assets/landscape.svg";

function Unauthorised() {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <>
      <div class="relative h-screen overflow-hidden bg-indigo-900">
        <img src={landscape} alt="bakcground" class="absolute object-cover w-full h-full" />
        <div class="absolute inset-0 bg-black opacity-25"></div>
        <div class="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-24">
          <div class="relative z-10 flex flex-col items-center w-full font-mono">
            <h1 class="mt-4 text-6xl font-extrabold leading-tight text-center text-white">
              Unauthorised Territory
            </h1>
            <h2 className="mt-4 text-3xl font-extrabold text-center text-white">
              You don't have access to this page
            </h2>
            <button
              onClick={back}
              className="text-lg text-white font-extrabold rounded-lg h-14 w-44 bg-cyan-700 hover:bg-cyan-900 transition duration-500 hover:-translate-y-1   mt-10"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Unauthorised;
