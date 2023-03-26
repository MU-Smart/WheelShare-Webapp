import 'App.css';
import { ToggleGoogleSource } from 'Components/Functions/ToggleSource.js';

const NavBar = (props) => {

  return (
    <>
      {/* Navbar */}
      <div className="navbar h-16 bg-base-100">
        {/* Search toggle */}
        <div className="navbar-start">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              props.setShowSearchPanel(!props.showSearchPanel)
            }}
          >
            <h3>Toggle Search</h3>
          </button>
        </div>
        <div className="navbar-center prose">
          <h2>MyPath</h2>
        </div>
        {/* Overlay toggles */}
        <div className="navbar-end gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              ToggleGoogleSource("surfaces", props.mapRef, 1);
            }}
          >
            Overlay 1
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              ToggleGoogleSource("surfaces", props.mapRef, 1);
            }}
          >
            Overlay 2
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              ToggleGoogleSource("surfaces", props.mapRef, 1);
            }}
          >
            Overlay 3
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
