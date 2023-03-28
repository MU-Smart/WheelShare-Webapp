import 'App.css';

const NavBar = (props) => {

  return (
    <>
      {/* Navbar */}
      <div className="navbar font-mono h-16 bg-base-100">
        {/* Search toggle */}
        <div className="navbar-start">
          <button
            className="btn btn-primary rounded-full btn-wide"
            onClick={() => {
              props.setShowSearchPanel(!props.showSearchPanel)
            }}
          >
            <div className="text-lg">Search</div>
          </button>
        </div>
        <div className="navbar-center prose">
          <h1>MyPath</h1>
        </div>
        {/* Overlay toggles */}
        <div className="navbar-end gap-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Sign In");
            }}
          >
            <div className="text-lg">Sign In</div>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Sign Up");
            }}
          >
            <div className="text-lg">Sign Up</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
