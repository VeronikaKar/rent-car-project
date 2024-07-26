import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://www.pexels.com/photo/mercedes-benz-parked-in-a-row-164634/)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Discover the Ultimate Car Rental Experience
          </h1>
          <p className="mb-5">
            Looking for the best car rental deals? Look no further! Our service
            provides you with the ultimate car rental experience. Choose from a
            wide range of vehicles, enjoy affordable rates, and drive with
            confidence. Whether you need a car for a business trip or a family
            vacation, we have the perfect solution for you.
          </p>
          <h2 className="mb-5 text-3xl font-bold">
            Why Choose Our Car Rental Service?
          </h2>
          <p className="mb-5">
            - Wide selection of vehicles
            <br />
            - Competitive pricing
            <br />
            - Excellent customer service
            <br />- Convenient pick-up and drop-off locations
          </p>
          <Link to="/catalog" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
