import { useState } from "react";
import { loginUser } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    const user = await loginUser(username, password);
    if (!user) {
      setError(true);
    }
    if (user) {
      navigate(`/${user.role.toLowerCase()}`);
    }
  };
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
                <form
                  className="w-5/6 flex flex-col justify-between"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <label htmlFor="username" className="ms-1">
                    Användarnamn
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full h-12 bg-white border !border-neutral-500 rounded p-2 mb-3"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                  <label htmlFor="password" className=" ms-1">
                    Lösenord
                  </label>
                  <input
                    type={inputType}
                    name="password"
                    placeholder="Password"
                    className="w-full h-12 bg-white border !border-neutral-500 rounded p-2"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                  <div
                    className="cursor-pointer ms-1 !text-sm w-fit mt-2"
                    onClick={() => {
                      setInputType((prev) =>
                        prev === "password" ? "text" : "password"
                      );
                    }}
                  >
                    Visa lösenord
                  </div>
                </form>
                <div className="w-full flex flex-col justify-center items-center mt-8">
                  <button
                    type="submit"
                    className="w-5/6 h-12 bg-secondary-color text-main-color rounded p-2 my-2"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
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
      <div
        className={`absolute text-black font-bold top-32 left-1/2 -translate-x-1/2 text-center pt-2 w-3/4 h-10 bg-neutral-300 shadow-box ${
          error ? "block" : "hidden"
        }`}
      >
        Felaktigt e-postadress eller lösenord.
      </div>
    </>
  );
};
