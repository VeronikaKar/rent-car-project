const HomePage = () => {
  return (
    <div className="hero min-h-screen">
      style=
      {{
        backgroundImage:
          "url(https://www.pexels.com/photo/silver-apple-keyboard-and-magic-mouse-on-a-pink-surface-399161/)",
      }}
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Why Choose the Contacts Book?
          </h1>
          <p className="mb-5">
            Discover the Ultimate Contacts Book: Your Essential Networking Tool!
            Connect. Remember. Succeed. Are you tired of losing important
            contacts or struggling to remember key details about your network?
            Introducing the Contacts Book, your ultimate companion for personal
            and professional networking!
          </p>
          <Link to="/contacts" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
