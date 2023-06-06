import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../features/questionsSlice";

const Index = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await axios.get(`/api/question`);
        console.log(response.data);
        dispatch(setQuestions(response.data.reverse()));
      } catch (error) {
        console.log(error);
      }
    }
    getQuestion();
  }, [dispatch]);

  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Main questions={questions} />
      </div>
    </div>
  );
};

export default Index;
