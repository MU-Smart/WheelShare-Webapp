import 'App.css';

const NavBar = (props) => {

  return (
    <>
      {/* Navbar */}
      <div className="navbar font-mono h-16 bg-accent">
        {/* Search toggle */}
        <div className="navbar-start">
          <button
            className="btn btn-wide text-lg text-white hover:border-white hover:border-2 m-4"
            onClick={() => {
              props.setShowSearchPanel(!props.showSearchPanel)
            }}
          > Search
          </button>
        </div>
        <div className="navbar-center prose">
          <h1 className="text-white">MyPath</h1>
        </div>
        {/* Overlay toggles */}
        <div className="navbar-end gap-2">
        <div class="btn-group lg:btn-group-horizontal">
          <button
            className="btn text-lg text-white hover:border-white hover:border-2"
            onClick={() => {
              props.setShowLoginOveray(true);
            }}
          >
            Sign In
          </button>
          <button
            className="btn text-lg text-white hover:border-white hover:border-2"
            onClick={() => {
              console.log("Sign Up");
            }}
          >
            Sign Up
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
