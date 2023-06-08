import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Allquestions from "./Allquestions";

const Main = ({ questions }) => {
  const [sortOption, setSortOption] = useState("newest");
  const [sortedQuestions, setSortedQuestions] = useState([]);

  useEffect(() => {
    const sortQuestions = (option) => {
      if (option === "newest") {
        return [...questions].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (option === "oldest") {
        return [...questions].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      } else {
        return questions;
      }
    };

    const sortedArray = sortQuestions(sortOption);
    setSortedQuestions(sortedArray);
  }, [questions, sortOption]);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <Button size="small" variant="contained">
              Ask Question
            </Button>
          </Link>
        </div>
        <div className="main-desc">
          <p>{questions && questions.length} questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link>Votes</Link>
              </div>
              <div className="main-tab">
                <Link>Views</Link>
              </div>
              <div
                className={`main-tab main-tab-button ${
                  sortOption === "newest" ? "active" : ""
                }`}
                onClick={() => handleSortOptionChange("newest")}
              >
                <Link>Newest</Link>
              </div>
              <div
                className={`main-tab main-tab-button ${
                  sortOption === "oldest" ? "active" : ""
                }`}
                onClick={() => handleSortOptionChange("oldest")}
              >
                <Link>Oldest</Link>
              </div>
            </div>

            <button className="main-filter-item">
              <FilterList />
              <p>Filter</p>
            </button>
          </div>
        </div>
      </div>
      <div className="questions">
        {sortedQuestions.map((question, key) => (
          <div key={key} className="question">
            <Allquestions question={question} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
