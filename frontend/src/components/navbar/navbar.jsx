import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/logo/logo.png";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaUser, FaLanguage, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageOpen(false);
  };

  const goToModule = (moduleName) => {
    navigate(`/module/${moduleName}`);
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      
      // Check for module names
      if (query === 'preamble') {
        navigate('/module/preamble');
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
        return;
      } else if (query === 'fundamental rights' || query === 'fundamentalrights') {
        navigate('/module/fundamental-rights');
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
        return;
      } else if (query === 'directive principles' || query === 'directiveprinciples') {
        navigate('/module/directive-principles');
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
        return;
      } else if (query === 'fundamental duties' || query === 'fundamentalduties') {
        navigate('/module/fundamental-duties');
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
        return;
      }

      // Extract article number from search query
      const articleMatch = query.match(/article\s*(\d+)/i);
      if (articleMatch) {
        const articleNumber = parseInt(articleMatch[1]);
        
        // Map article numbers to their respective modules
        let targetModule = '';
        if (articleNumber >= 14 && articleNumber <= 18) {
          targetModule = 'fundamental-rights';
        } else if (articleNumber >= 19 && articleNumber <= 22) {
          targetModule = 'fundamental-rights';
        } else if (articleNumber >= 23 && articleNumber <= 24) {
          targetModule = 'fundamental-rights';
        } else if (articleNumber >= 25 && articleNumber <= 28) {
          targetModule = 'fundamental-rights';
        } else if (articleNumber >= 29 && articleNumber <= 30) {
          targetModule = 'fundamental-rights';
        } else if (articleNumber >= 36 && articleNumber <= 51) {
          targetModule = 'directive-principles';
        } else if (articleNumber === 51) {
          targetModule = 'fundamental-duties';
        } else {
          // If article number doesn't match any module, show error
          toast.error("Article not found. Please check the article number.");
          return;
        }
        
        // Navigate to the module
        navigate(`/module/${targetModule}`);
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
      } else {
        // If no article number found, perform regular search
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setSearchQuery("");
        setSearchActive(false);
        setIsMenuOpen(false);
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className="navbar-links-container">
          <div className="navbar-links">
            <Link to="/">{t("navbar.home")}</Link>
            <a onClick={() => goToModule("preamble")}>{t("navbar.preamble")}</a>
            <a onClick={() => goToModule("fundamental-rights")}>{t("navbar.fundamentalRights")}</a>
            <a onClick={() => goToModule("directive-principles")}>{t("navbar.directivePrinciples")}</a>
            <a onClick={() => goToModule("fundamental-duties")}>{t("navbar.fundamentalDuties")}</a>
            <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <a className="dropdown-toggle">{t("navbar.learnPlay")}</a>
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

        {/* Desktop Right Side Items */}
        <div className="navbar-right">
          <div className="search-wrapper">
            <FaSearch className="search-icon" onClick={toggleSearch} />
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

          <div className="language-selector" onMouseEnter={() => setLanguageOpen(true)} onMouseLeave={() => setLanguageOpen(false)}>
            <button className="language-button">
              <FaLanguage /> {i18n.language === 'en' ? 'English' : 'हिंदी'}
            </button>
            {languageOpen && (
              <div className="language-menu">
                <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("hi")}>हिंदी</button>
              </div>
            )}
          </div>

          <Link to="/login" className="login-button">
            {t("Login")}
          </Link>

          <div className="profile-emoji" onClick={() => navigate("/profile")}>
            <FaUser />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-items">
            <Link to="/" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
              {t("navbar.home")}
            </Link>
            <a className="mobile-menu-item" onClick={() => goToModule("preamble")}>
              {t("navbar.preamble")}
            </a>
            <a className="mobile-menu-item" onClick={() => goToModule("fundamental-rights")}>
              {t("navbar.fundamentalRights")}
            </a>
            <a className="mobile-menu-item" onClick={() => goToModule("directive-principles")}>
              {t("navbar.directivePrinciples")}
            </a>
            <a className="mobile-menu-item" onClick={() => goToModule("fundamental-duties")}>
              {t("navbar.fundamentalDuties")}
            </a>
            <div className="dropdown">
              <a className="mobile-menu-item dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {t("navbar.learnPlay")}
              </a>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a className="mobile-menu-item" href="#">{t("navbar.hangman")}</a>
                  <a className="mobile-menu-item" href="#">{t("navbar.spinWheel")}</a>
                  <a className="mobile-menu-item" href="#">{t("navbar.wordScramble")}</a>
                </div>
              )}
            </div>

            <div className="mobile-menu-divider" />

            <div className="search-wrapper">
              <FaSearch className="search-icon" onClick={toggleSearch} />
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

            <div className="mobile-menu-divider" />

            <div className="language-selector">
              <button 
                className="language-button"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <FaLanguage /> {i18n.language === 'en' ? 'English' : 'हिंदी'}
              </button>
              {languageOpen && (
                <div className="language-menu">
                  <button onClick={() => changeLanguage("en")}>English</button>
                  <button onClick={() => changeLanguage("hi")}>हिंदी</button>
                </div>
              )}
            </div>

            <Link to="/login" className="login-button mobile-menu-item">
              {t("Login")}
            </Link>

            <div 
              className="profile-emoji mobile-menu-item"
              onClick={() => {
                navigate("/profile");
                setIsMenuOpen(false);
              }}
            >
              <FaUser /> {t("navbar.profile")}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
