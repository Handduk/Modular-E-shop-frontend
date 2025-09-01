import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isDarkMode } from "../../Hooks/useDarkMode";

const accordionItems = [
  {
    id: 1,
    name: "Hjälp & kontakt",
    links: [
      {
        id: 1,
        name: "Betalning",
        link: "/faq/paymentTerms",
        img: "",
      },
      {
        id: 2,
        name: "Leverans och retur",
        link: "/faq/shippingInfo",
        img: "",
      },
    ],
  },
  {
    id: 2,
    name: "Vi skickar dina paket med",
    links: [
      {
        id: 1,
        name: "Svensk hemleverans",
        img: "public/IMG/idIXX66YZG_logos.png",
        link: "/faq/shippingInfo",
      },
      {
        id: 2,
        name: "Postnord",
        img: "public/IMG/Postnord.png",
        link: "/faq/shippingInfo",
      },
    ],
  },
  {
    id: 3,
    name: "Betalningsalternativ",
    links: [
      {
        id: 1,
        name: "Mastercard",
        img: "public/IMG/ma_symbol_opt_73_3x.png",
        link: "/faq/paymentTerms",
      },
      {
        id: 2,
        name: "Visa",
        img: "public/IMG/visa-brandmark-blue-1960x622.png",
        link: "/faq/paymentTerms",
      },
      {
        id: 3,
        name: "Swish",
        img: [
          "public/IMG/Swish Logo Primary PNG.png",
          "public/IMG/Swish Logo Primary Dark-BG.png",
        ],
        link: "/faq/paymentTerms",
      },
      {
        id: 4,
        name: "Klarna",
        img: [
          "public/IMG/Wordmark Transparent And Black.png",
          "public/IMG/Wordmark Transparent And Pink.png",
        ],
        link: "/faq/paymentTerms",
      },
    ],
  },
];

export const FooterInfo = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const showImage = (
    item:
      | {
          id: number;
          name: string;
          img: string;
          link: string;
        }
      | {
          id: number;
          name: string;
          img: string[];
          link: string;
        }
  ) => {
    if (!isDarkMode() && typeof item.img === "string") {
      return item.img;
    }
    if (!isDarkMode() && Array.isArray(item.img)) {
      return item.img[0];
    }
    if (isDarkMode() && Array.isArray(item.img)) {
      return item.img[1];
    }
    if (isDarkMode() && typeof item.img === "string") {
      return item.img;
    }
  };

  return (
    <div>
      <div
        className="w-screen flex flex-col justify-center min-sm:hidden bg-neutral-200 
      dark:bg-dark-main-color dark:text-dark-secondary-color"
      >
        <div className="w-full flex flex-col">
          {accordionItems.map((item) => (
            <div key={item.id} className="border-b border-black py-2">
              <div
                className="cursor-pointer px-3 py-2 flex justify-between items-center"
                onClick={() => handleAccordion(item.id)}
              >
                <span className="font-semibold">{item.name}</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={`transition-transform duration-400 ${
                    openId === item.id ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {openId === item.id && (
                <div className="px-3 pb-3">
                  {item.links.map((res) =>
                    res.img == "" ? (
                      <div
                        key={res.id}
                        className="block py-1 text-gray-700 dark:text-dark-secondary-color"
                        onClick={() => navigate(res.link)}
                      >
                        {res.name}
                      </div>
                    ) : (
                      <img
                        key={res.id}
                        src={showImage(res)}
                        alt=""
                        className="size-16 object-contain inline-block mr-2"
                        onClick={() => navigate(res.link)}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="w-screen h-fit flex flex-row justify-around max-md:hidden bg-main-color 
      py-4 dark:bg-dark-main-color dark:text-dark-secondary-color"
      >
        {accordionItems.map((item, index) => (
          <div
            key={index}
            className="w-1/3 flex flex-col items-center font-semibold text-xl p-2 space-y-1 lg:w-1/5 lg:items-baseline"
          >
            <div className="pb-2">{item.name}</div>
            <div
              className={`w-full flex flex-wrap items-center ${
                item.links.some((res) => res.img !== "")
                  ? "lg:flex-row space-x-4 max-lg:ps-4"
                  : "flex-col space-y-2 lg:items-start"
              }`}
            >
              {item.links.map((res) => (
                <div key={res.id} className="font-normal cursor-pointer">
                  {res.img === "" ? (
                    <div onClick={() => navigate(res.link)}>{res.name}</div>
                  ) : (
                    <img
                      title={res.name}
                      src={showImage(res)}
                      alt={res.name}
                      className="size-15 lg:size-20 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
