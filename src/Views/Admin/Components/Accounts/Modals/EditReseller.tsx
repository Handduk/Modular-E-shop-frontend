import { useEffect, useState } from "react";
import {
  handleChangeReseller,
  handleDeleteReseller,
  handleUpdateReseller,
} from "../../../../../Hooks/Reseller/resellerHooks";
import { User } from "../../../../../Models/User";

interface EditResellerProps {
  resel: User;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedReseller: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedReseller: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditReseller = ({
  resel,
  show,
  setShow,
  setDeletedReseller,
  setUpdatedReseller,
}: EditResellerProps) => {
  const [reseller, setReseller] = useState<User>(resel);

  useEffect(() => {
    if (show) {
      setReseller(resel);
    }
  }, [resel]);
  return (
    reseller && (
      <>
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
            <div>
              <h1 className="text-center text-3xl font-semibold">
                {reseller.name}
              </h1>
              <div className="flex flex-col items-center mt-4">
                <form
                  className="flex flex-col items-center justify-center mt-4 w-8/10"
                  onSubmit={(e) =>
                    handleUpdateReseller(
                      e,
                      reseller,
                      setUpdatedReseller,
                      setShow
                    )
                  }
                >
                  <input type="hidden" name="id" value={reseller.id} />
                  <input
                    type="text"
                    placeholder="Namn"
                    name="name"
                    value={reseller.name}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={(e) => handleChangeReseller(e, setReseller)}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={reseller.email}
                    required
                    className="w-full h-10 border !border-neutral-500 !rounded-md mb-4 px-2"
                    onChange={(e) => handleChangeReseller(e, setReseller)}
                  />
                  {/* If logged in user is admin, show password field */}
                  <div className="w-full flex flex-row items-center justify-center gap-4">
                    <button
                      type="submit"
                      className="w-full h-10 bg-neutral-200/30 border !border-neutral-500 !rounded-md
                        hover:bg-neutral-300 transition-all duration-300 ease-in-out"
                    >
                      Spara
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 bg-red-500/80 border !border-neutral-500 !rounded-md
                        hover:bg-red-600 hover:text-main-color transition-all duration-300 ease-in-out"
                      onClick={() =>
                        handleDeleteReseller(
                          reseller.id,
                          setDeletedReseller,
                          setShow
                        )
                      }
                    >
                      Radera återförsäljare
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
