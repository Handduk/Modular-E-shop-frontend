import { Topsection } from "../Sections/Topsection/Topsection";
import { CategorySection } from "../Sections/CategorySection/CategorySection";
import { SecondSection } from "../Sections/SecondSection/SecondSection";
import { Header } from "../Sections/Header/Header";
import { Footer } from "../../../Components/Footer/Footer";
import { FooterInfo } from "../../../Components/Footer/FooterInfo";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody bg-main-color dark:bg-dark-main-color">
        <div className="content">
          <Header />
          <div className="w-full lg:px-20">
            <Topsection />
            <CategorySection />
          </div>
          <SecondSection />
          <FooterInfo />
          <Footer />
        </div>
      </div>
    </>
  );
};
