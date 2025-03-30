export const Login = () => {
  return (
    <>
      <div className="contentBody h-[calc(100vh-5rem)]">
        <div className="content h-full">
          <div className="w-full h-full flex justify-center">
            <div className="w-3/4 h-3/6 flex flex-col items-center bg-neutral-300 rounded shadow-box mt-24">
              <div className="w-full h-1/6 flex justify-center items-center">
                <h1>Logga in</h1>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <form className="w-5/6 flex flex-col justify-between">
                  <label htmlFor="username" className="ms-1">
                    Användarnamn
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full h-12 bg-white border !border-neutral-500 rounded p-2 mb-3"
                  />
                  <label htmlFor="password" className=" ms-1">
                    Lösenord
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-12 bg-white border !border-neutral-500 rounded p-2 mb-3"
                  />
                </form>
                <div className="w-full flex flex-col justify-center items-center mt-8">
                  <button className="w-5/6 h-12 bg-secondary-color text-main-color rounded p-2 my-2">
                    Logga in
                  </button>
                  <div>
                    <p className="cursor-pointer px-3 py-2 ">Glömt lösenord?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
