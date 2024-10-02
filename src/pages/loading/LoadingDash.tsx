function LoadingDash() {
  return (
    <>
      <div className="z-20 flex flex-col items-center w-screen h-screen gap-10 p-4 bg-base-100">
        <div className="flex justify-between w-full">
          <div className="w-10 h-10 rounded-full skeleton shrink-0"></div>
          <div className="w-24 h-10 skeleton"></div>
          <div className="w-10 h-10 rounded-full skeleton"></div>
        </div>

        <div className="flex flex-col items-center w-full gap-4 p-8 skeleton">
          <div className="w-1/5 h-4 skeleton bg-base-200"></div>
          <div className="w-3/5 h-4 skeleton bg-base-200"></div>
          <div className="flex justify-between w-full mt-4">
            <div className="w-5/12 h-20 skeleton bg-base-200"></div>
            <div className="w-5/12 h-20 skeleton bg-base-200"></div>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="w-2/5 h-4 skeleton bg-base-200"></div>
          <div className="w-1/5 h-4 skeleton bg-base-200"></div>
        </div>

        <div className="flex items-center w-full gap-4 -mt-4">
          <div className="flex flex-col w-full gap-2">
            <div className="w-1/6 h-4 skeleton bg-base-200"></div>
            <div className="w-1/3 h-4 skeleton bg-base-200"></div>
          </div>
          <div className="w-1/3 h-8 skeleton bg-base-200"></div>
        </div>

        <div className="flex items-center w-full gap-4 -mt-4">
          <div className="flex flex-col w-full gap-2">
            <div className="w-1/6 h-4 skeleton bg-base-200"></div>
            <div className="w-1/3 h-4 skeleton bg-base-200"></div>
          </div>
          <div className="w-1/3 h-8 skeleton bg-base-200"></div>
        </div>

        <div className="flex items-center w-full gap-4 -mt-4">
          <div className="flex flex-col w-full gap-2">
            <div className="w-1/6 h-4 skeleton bg-base-200"></div>
            <div className="w-1/3 h-4 skeleton bg-base-200"></div>
          </div>
          <div className="w-1/3 h-8 skeleton bg-base-200"></div>
        </div>
      </div>
      <div className="fixed bottom-0 z-20 flex items-center justify-between w-full h-20 p-4 skeleton">
        <div className="w-1/5 h-12 rounded-circle skeleton bg-base-200"></div>
        <div className="w-1/5 h-12 rounded-circle skeleton bg-base-200"></div>
        <div className="w-1/5 h-12 rounded-circle skeleton bg-base-200"></div>
      </div>
    </>
  );
}

export default LoadingDash;
