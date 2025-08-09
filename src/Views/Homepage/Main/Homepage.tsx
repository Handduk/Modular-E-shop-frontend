import { Topsection } from "../Sections/Topsection/Topsection";
import { CategorySection } from "../Sections/CategorySection/CategorySection";
import { SecondSection } from "../Sections/SecondSection/SecondSection";
import { Header } from "../Sections/Header/Header";
import { Footer } from "../../../Components/Footer/footer";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody lg:pt-0">
        <div className="content">
          <Header />
          <Topsection />
          <CategorySection />
          <SecondSection />
          <Footer />
        </div>
      </div>
    </>
  );
};
