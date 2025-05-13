import { useState } from "react";
import { Accounts } from "./Components/Accounts";
import { Dashboard } from "./Components/Dashboard";
import { ProductList } from "./Components/Products/ProductList";

export const Admin = () => {
  const menuList = [
    { name: "Dashboard", view: <Dashboard /> },
    { name: "Produkter", view: <ProductList /> },
    { name: "Återförsäljare", view: <Accounts /> },
  ];

  const [selectedView, setSelectedView] = useState<JSX.Element>(
    menuList[0].view
  );

  return (
    <>
      <div className="contentBody">
        <div className="content h-full">
          <div className="w-full h-full flex">
            <nav className="w-1/8 bg-secondary-color flex flex-col py-2">
              <div className="w-full flex justify-center items-center text-main-color mb-1 border-b-2">
                <h1 className="mb-3">Dashboard</h1>
              </div>
              <div className="text-main-color w-full">
                <ul className="w-full space-y-1 !pl-0">
                  {menuList.map((item, index) => (
                    <li
                      key={index}
                      className="hover:bg-black/20 transition-all duration-200 ease-linear cursor-pointer pl-2 py-2"
                      onClick={() => {
                        setSelectedView(item.view);
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-main-color mt-auto mb-2 ms-2 hover:text-yellow-500 transition-all duration-200 ease-linear cursor-pointer">
                Logga ut
              </div>
            </nav>
            <div className="w-7/8">{selectedView}</div>
          </div>
        </div>
      </div>
    </>
  );
};
