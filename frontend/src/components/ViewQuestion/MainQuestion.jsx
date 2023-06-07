import React, { useEffect, useState } from "react";
import { Avatar, Button, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import "../Stackoverflow/index.css";
import { Bookmark, History } from "@mui/icons-material";
import ReactQuill from "react-quill";
import Editor from "react-quill/lib";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
const MainQuestion = () => {
  const location = useLocation();
  const BASE_URL = process.env.BASE_URL;
  let search = location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const nav = useNavigate();

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const [show, setshow] = useState(false);

  const [questionData, setQuestionData] = useState();

  const user = useSelector(selectUser);
  const [answer, setanswer] = useState("");
  const handleQuill = (value) => {
    setanswer(value);
  };

  const deletequestion = async () => {
    // console.alert("Are you sure you want to delete");
    await axios
      .delete(`/${BASE_URL}/question/${id}`)
      .then((res) => {
        console.log(res.data);
        getUpdatedAnswers();
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [comment, setcomment] = useState("");
  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };

      await axios
        .post(`/${BASE_URL}/comment/${id}`, body)
        .then((res) => {
          console.log(res.data);
          setcomment("");
          setshow(false);
          getUpdatedAnswers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async function getUpdatedAnswers() {
    await axios
      .get(`/${BASE_URL}/question/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setQuestionData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios
        .post(`/${BASE_URL}/answer`, body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added successfully");
          setanswer("");
          getUpdatedAnswers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    async function getQuestionDetails() {
      await axios
        .get(`/${BASE_URL}/question/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          setQuestionData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getQuestionDetails();
  }, [id]);

  return (
    <div className="main-box">
      <div className="main-container-box">
        <div className="main-top-box">
          <div className="main-question-box">
            <h2>{questionData?.title}</h2>
            <Link to="/add-question">
              {" "}
              <Button size="small" variant="contained">
                Ask Question
              </Button>
            </Link>
          </div>
          <div className="main-desc-box">
            <div className="info">
              <p>{new Date(questionData?.created_at).toLocaleString()}</p>
              <p>
                Active <span>today</span>
              </p>
              <p>
                Viewed <span>43 times</span>
              </p>
            </div>
            <div className="info">
              {user && user.uid === questionData?.user?.uid && (
                <Link to={`/update-question?q=${id}`}>
                  <EditIcon className="icon" style={{ display: "flex" }} />
                </Link>
              )}
              {user && user.uid === questionData?.user?.uid && (
                <DeleteIcon
                  className="icon"
                  style={{ display: "flex" }}
                  onClick={deletequestion}
                />
              )}
            </div>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">0</p>
                <p className="arrow">▼</p>
                <Bookmark />
                <History />
              </div>
            </div>
            <div className="question-answer">
              {ReactHtmlParser(String(questionData?.body))}
              <div className="author">
                <small>
                  {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : String(questionData?.user?.email).split("@")[0]}
                  </p>
                </div>
              </div>

              <div className="comments">
                {questionData?.comments &&
                  questionData?.comments.map((e, key) => (
                    <div key={key} className="comment">
                      <p>
                        {e.comment}
                        <span>
                          {e?.user?.displayName
                            ? e?.user?.displayName
                            : String(e?.user?.email).split("@")[0]}
                        </span>
                        <small>
                          {new Date(e?.created_at).toLocaleString()}
                        </small>
                      </p>
                    </div>
                  ))}

                <p onClick={() => setshow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                      type="text"
                      rows={5}
                      style={{
                        // width: "70%",
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      placeholder="Add your comment"
                    />
                    <Button
                      onClick={handleComment}
                      variant="contained"
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add Comment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData?.answerDetails?.length} Answers
          </p>
          {questionData?.answersDetails &&
            questionData.answersDetails.map((e, key) => (
              // Rest of your code
              <div key={key} className="all-questions-container">
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>
                    <p className="arrow">0</p>
                    <p className="arrow">▼</p>
                    <Bookmark />
                    <History />
                  </div>
                </div>
                <div className="question-answer">
                  <p> {ReactHtmlParser(e?.answer)}</p>
                  <div className="author">
                    <small>{new Date(e?.created_at).toLocaleString()}</small>
                    <div className="auth-details">
                      <Avatar src={e?.user?.photo} />
                      <p>
                        {e?.user?.displayName
                          ? e?.user?.displayName
                          : String(e?.user?.email).split("@")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          modules={Editor.modules}
          value={answer}
          onChange={handleQuill}
          style={{ height: "200px" }}
          className="react-quill"
          theme="snow"
        />
      </div>
      <Button
        type="submit"
        onClick={handlesubmit}
        style={{
          marginTop: "50px",
          maxWidth: "fit-content",
        }}
        size="small"
        variant="contained"
      >
        Post your answers
      </Button>
    </div>
  );
};

export default MainQuestion;
