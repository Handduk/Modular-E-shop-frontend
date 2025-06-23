import { useState } from "react";
import { User } from "../../../../../Models/User";
import {
  defaultReseller,
  handleChangeReseller,
  handlePostReseller,
} from "../../../../../Hooks/Reseller/resellerHooks";

interface AddResellerProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedReseller: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddReseller = ({
  show,
  setShow,
  setCreatedReseller,
}: AddResellerProps) => {
  const [reseller, setReseller] = useState<User>(defaultReseller);

  return (
    <div
      className={`${
        show
          ? "opacity-100 pointer-events-auto transition-all duration-200"
          : "opacity-0 pointer-events-none transition-all duration-200"
      } absolute top-0 left-0 w-full h-full flex items-center justify-center bg-neutral-800/80`}
    >
      <div className="w-8/10 h-8/10 flex flex-col bg-main-color">
        <div className="w-full h-8 flex justify-end">
          <button
            className="w-10 h-full border !border-neutral-500 !rounded-md me-2 mt-2
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            onClick={() => setShow(!show)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold">
            Ny återförsäljare
          </h1>
          <form
            className="flex flex-col mt-4 w-8/10"
            onSubmit={(e) =>
              handlePostReseller(
                e,
                reseller,
                setCreatedReseller,
                setShow,
                setReseller
              )
            }
          >
            <label htmlFor="resellerName" className="self-start mb-1 ms-1">
              Namn
            </label>
            <input
              id="resellerName"
              type="text"
              name="name"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-2 px-2 bg-neutral-200"
              onChange={(e) => handleChangeReseller(e, setReseller)}
            />
            <label htmlFor="resellerEmail" className="self-start mb-1 ms-1">
              Email
            </label>
            <input
              id="resellerEmail"
              type="text"
              name="email"
              required
              className="h-10 border !border-neutral-500 !rounded-md mb-4 px-2 bg-neutral-200"
              onChange={(e) => handleChangeReseller(e, setReseller)}
            />
            <button
              type="submit"
              className=" h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md 
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            >
              Skapa återförsäljare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
