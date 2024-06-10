import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ connectWallet, isWalletConnected }) => {
  return (
    <nav id="navBar" className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="images/logo.png" className="img-fluid" alt="MakeMyDapp" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-repeat"
                >
                  <path d="m17 2 4 4-4 4"></path>
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                  <path d="m7 22-4-4 4-4"></path>
                  <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                </svg>
                Swap
              </Link>
            </li>
            <li className="nav-item mx-auto me-lg-0 ms-lg-auto">
              <Link to="/" className="nav-item-btn btn btn-transparent">
                <img src="/images/cronos-cro-logo.png" alt="cronos-cro-logo" className="img-fluid" />
              </Link>
            </li>
            <li className="nav-item btn-wapper">
              {isWalletConnected ? (
                <button onClick={connectWallet} className="btn nav-item-btn">
                  Connected
                </button>
              ) : (
                <button onClick={connectWallet} className="btn nav-item-btn">
                  Connect
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
