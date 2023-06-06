import React, { useState, useEffect } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { selectQuestions } from "../../features/questionsSlice";

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const questions = useSelector(selectQuestions);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Initially show the dropdown

  const handleSearchInputChange = (e) => {
    if (e.target.value === "" || e.target.value === " ") {
      setShowDropdown(false);
    }
    setSearchQuery(e.target.value);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      filterQuestions();
    }
  };

  const handleQuestionClick = (question) => {
    setShowDropdown(false);
    nav(`/view-question?q=${question._id}`);
  };

  const filterQuestions = () => {
    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
    setShowDropdown(true);
    if (filtered.length === 0) {
      setSearchQuery("");
    }
  };

  // useEffect(() => {
  //   setFilteredQuestions([]); // Reset filteredQuestions when the user navigates to a different page
  // }, [location]);

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img src="logo.png" alt="logo" />
          </Link>
        </div>
        <div className="header-mid">
          <div className="header-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchInputKeyPress}
            />
          </div>
          {showDropdown && filteredQuestions.length > 0 && (
            <div className="search-dropdown">
              {filteredQuestions.map((question) => (
                <div
                  key={question._id}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <h4 style={{ margin: "8px", fontSize: "15px" }}>
              Hi!{" "}
              <span
                style={{
                  color: "#0151f0d8",
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                {user ? (user.displayName ? user.displayName : "User") : ""}
              </span>
            </h4>
            <Button
              onClick={() => auth.signOut()}
              size="small"
              variant="contained"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
