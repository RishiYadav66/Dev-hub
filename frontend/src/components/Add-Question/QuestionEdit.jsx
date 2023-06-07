import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import Editor from "react-quill/lib";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import "./question.css";
import { Button } from "@mui/material";

function QuestionEdit() {
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

  const nav = useNavigate();
  const location = useLocation();
  let search = location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchQuestionData() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => {
          const questionData = res.data[0];
          setTitle(questionData.title);
          setBody(questionData.body);
          const formattedTags = JSON.parse(questionData.tags);
          setTags(formattedTags);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchQuestionData();
  }, [id]);
  const handleTagsChange = (newTags) => {
    setTags([...newTags]);
  };

  const handleQuill = (value) => {
    setBody(value);
  };

  // Update question handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the updated question object
    const updatedQuestion = {
      title: title,
      body: body,
      tags: JSON.stringify(tags),
    };

    // Send the updated question data to the server
    await axios
      .put(`/api/question/${id}`, updatedQuestion)
      .then((res) => {
        console.log(res.data);
        alert("Question updated successfully");
        setloading(false);
        nav("/");
        // Handle success or redirect to the question page
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  };

  return (
    <>
      <div className="add-question">
        <div className="add-question-container">
          <div className="head-title">
            <h2>Update question</h2>
          </div>
          <div className="question-container">
            <div className="question-options">
              <div className="question-option">
                <div className="title">
                  <h3>Title</h3>
                  <small>
                    Be specific and imagine you’re asking a question to another
                    person
                  </small>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Body</h3>
                  <small>
                    Include all the information someone would need to answer
                    your question
                  </small>

                  <ReactQuill
                    modules={Editor.modules}
                    value={body}
                    onChange={handleQuill}
                    className="react-quill"
                    theme="snow"
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Tags</h3>
                  <small>
                    Add up to 5 tags to describe what your question is about
                  </small>

                  <TagsInput
                    value={tags}
                    onChange={handleTagsChange} // Update the onChange handler to handle tags individually
                    name="fruits"
                    placeHolder="press enter to add new tag"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            style={{ marginTop: "10px" }}
            onClick={handleSubmit}
            variant="contained"
          >
            {loading ? "Updating Question..." : "Update your question"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default QuestionEdit;
