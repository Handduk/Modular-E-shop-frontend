import { useEffect, useState } from "react";
import { User } from "../../../../Models/User";
import { AddReseller } from "./Modals/AddReseller";
import { getUserByRole } from "../../../../services/userApi";
import { EditReseller } from "./Modals/EditReseller";
import { setStorage } from "../../../../Hooks/localstorage";

export const Accounts = () => {
  const [resellers, setResellers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [createdReseller, setCreatedReseller] = useState<boolean>(false);
  const [updatedReseller, setUpdatedReseller] = useState<boolean>(false);
  const [deletedReseller, setDeletedReseller] = useState<boolean>(false);

  const [singleReseller, setSingleReseller] = useState<User>({
    id: 0,
    name: "",
    email: "",
    role: "reseller",
    passwordHash: "",
  });

  const showAddResellerModal = () => {
    setCreatedReseller(false);
    setShowModal(true);
  };

  const showEditResellerModal = (reseller: User) => {
    setSingleReseller(reseller);
    setStorage("reseller", reseller);
    setUpdatedReseller(false);
    setShowModal(true);
  };

  const getResellers = async () => {
    try {
      const response = await getUserByRole("reseller");
      if (response) {
        setResellers(response);
      } else {
        console.error("No resellers found.");
      }
    } catch (error) {
      console.error("Error fetching resellers:", error);
    }
  };

  useEffect(() => {
    getResellers();
  }, [createdReseller, updatedReseller, deletedReseller]);

  return (
    <div className="text-center">
      <h1>Återförsäljare</h1>
      <div className="flex flex-row flex-wrap mx-4 mt-4">
        <div className="flex flex-row flex-wrap gap-4 me-4">
          {resellers &&
            resellers.map((res, index) => (
              <div
                key={index}
                className="relative w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 cursor-pointer !rounded-2xl
                    hover:bg-neutral-300 transition-all duration-300 ease-in-out"
                onClick={() => {
                  showEditResellerModal(res);
                }}
              >
                <div className="absolute inset-0 bg-black/60 rounded-2xl" />
                <div className="absolute text-main-color font-bold text-3xl w-full h-full flex items-center justify-center hover:text-4xl transition-all duration-300 ease-in-out">
                  {res.name}
                </div>
              </div>
            ))}
        </div>
        <div>
          <button
            className="w-52 h-40 flex flex-col items-center justify-center bg-neutral-200/30 border-1 border-neutral-500 !rounded-2xl
              hover:bg-neutral-300 transition-all duration-300 ease-in-out"
            onClick={() => showAddResellerModal()}
          >
            <h2 className="!text-2xl">Ny återförsäljare</h2>+
          </button>
        </div>
      </div>
      <AddReseller
        show={showModal}
        setShow={setShowModal}
        setCreatedReseller={setCreatedReseller}
      />
      <EditReseller
        resel={singleReseller}
        show={showModal}
        setShow={setShowModal}
        setDeletedReseller={setDeletedReseller}
        setUpdatedReseller={setUpdatedReseller}
      />
    </div>
  );
};
