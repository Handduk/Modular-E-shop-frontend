import { Footer } from "../../Components/Footer/Footer";

export const Terms = () => {
  return (
    <div className="contentBody">
      <div className="content">
        <div className="p-10 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Terms & Conditions</h1>
          <p className="mb-4">
            This is a test version of our Terms & Conditions page used during
            development of the Nets Easy checkout integration.
          </p>
          <p className="mb-4">
            By proceeding to payment, you accept our general terms of sale,
            return policy, and privacy policy.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All demo purchases are non-refundable.</li>
            <li>No actual items will be shipped.</li>
            <li>This is for testing purposes only.</li>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};
