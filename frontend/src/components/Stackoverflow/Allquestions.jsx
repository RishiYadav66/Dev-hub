import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { Avatar } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
const Allquestions = ({ question }) => {
  const date = new Date(question?.created_at).toLocaleString();
  const tags = JSON.parse(question.tags);
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Votes</span>
            </div>
            <div className="all-option">
              <p className="answerpara">{question?.answerDetails?.length}</p>
              <span>Answer</span>
            </div>
            <div className="all-option">
              <p>0</p>
              <small>Views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link
            style={{ width: "90%" }}
            to={`/view-question?q=${question?._id}`}
          >
            {question?.title}
          </Link>
          <div>
            <div style={{ width: "90%" }} className="question-body">
              {ReactHtmlParser(question?.body)}
            </div>
            <div style={{ display: "flex" }}>
              {tags.map((e, key) => (
                <span key={key} className="question-tags">
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className="author">
            <small>{date}</small>
            <div className="author-details">
              <Avatar src={question?.user?.photo} />
              <p>
                {question?.user?.displayName
                  ? question?.user?.displayName
                  : String(question?.user?.email).split("@")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allquestions;
