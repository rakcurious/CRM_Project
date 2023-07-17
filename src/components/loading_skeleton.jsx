const Loading = () => {
  return (
    <div
      className={`h-40 w-68 shadow-lg bg-neutral-200 rounded m-4 outline outline-1   outline-zinc-300  `}
    >
      <div
        className={`h-2/5 shadow-lg bg-neutral-300 flex justify-center items-center rounded-t rounded-b-xl `}
      ></div>
      <div className="static h-3/5 rounded flex justify-evenly items-center"></div>
    </div>
  );
};

export default Loading;
