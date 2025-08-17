import { Topsection } from "../Sections/Topsection/Topsection";
import { CategorySection } from "../Sections/CategorySection/CategorySection";
import { SecondSection } from "../Sections/SecondSection/SecondSection";
import { Header } from "../Sections/Header/Header";
import { Footer } from "../../../Components/Footer/footer";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody">
        <div className="content">
          <Header />
          <div className="w-full lg:px-20">
            <Topsection />
            <CategorySection />
          </div>
          <SecondSection />
          <Footer />
        </div>
      </div>
    </>
  );
};
