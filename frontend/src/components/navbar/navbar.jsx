import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/logo/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const [searchActive, setSearchActive] = useState(false); // Track search icon toggle

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const goToModule = (moduleName) => {
    navigate(`/module/${moduleName}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchActive(false); // Close the search after submission
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Nav Links */}
        <div className="navbar-links-container">
          <div className="navbar-links">
            <a onClick={() => navigate("/")}>{t("navbar.home")}</a>
            <a onClick={() => goToModule("preamble")}>{t("navbar.preamble")}</a>
            <a onClick={() => goToModule("fundamental-rights")}>{t("navbar.fundamentalRights")}</a>
            <a onClick={() => goToModule("directive-principles")}>{t("navbar.directivePrinciples")}</a>
            <a onClick={() => goToModule("fundamental-duties")}>{t("navbar.fundamentalDuties")}</a>

            {/* Learn & Play Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a href="#" className="dropdown-toggle">
                {t("navbar.learnPlay")}
              </a>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a href="#">{t("navbar.hangman")}</a>
                  <a href="#">{t("navbar.spinWheel")}</a>
                  <a href="#">{t("navbar.wordScramble")}</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🔍 Clickable Search Icon */}
        <div className="search-wrapper">
          <span
            className="search-icon"
            onClick={() => setSearchActive(!searchActive)} // Toggle input visibility
          >
            🔍
          </span>

          {/* Search Form (Only shows when searchActive is true) */}
          {searchActive && (
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={t("ask") || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-go">
                {t("go") || "Go"}
              </button>
            </form>
          )}
        </div>

        {/* Language Selector */}
        <div 
          className="language-selector"
          onMouseEnter={() => setLanguageOpen(true)}
          onMouseLeave={() => setLanguageOpen(false)}
        >
          <button className="language-button">{t("navbar.language")}</button>
          <div className={`language-menu ${languageOpen ? "open" : ""}`}>
            <button onClick={() => changeLanguage("en")}>{t("navbar.english")}</button>
            <button onClick={() => changeLanguage("hi")}>{t("navbar.hindi")}</button>
          </div>
        </div>

        {/* Login Button */}
        <div>
          <button className="login-button" onClick={() => navigate("/login")}>
            {t("Login")}
          </button>
        </div>

        {/* Profile Emoji */}
        <div className="profile-emoji" onClick={() => navigate("/profile")}>
          👤
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
