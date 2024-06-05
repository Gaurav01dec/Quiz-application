import { useState } from "react"
import QUESTIONS from "../question.js"
import quizCompleteLogo from "../assets/quiz-complete.png"

export default function Quiz() {
    // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    // const [countResult,setCountResult]
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length


    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        })
    }


    function reset() {
        setUserAnswers([])
    }

    if (quizIsComplete) {

        const correctAnswers = QUESTIONS.map(question => question.answers[0]);
        let sum = 0;
        for (let i = 0; i < userAnswers.length; i++) {
            if (correctAnswers.includes(userAnswers[i])) {
                sum += 1
            }
        }
        return (
            <div id="summary">
                <img src={quizCompleteLogo} alt="Trophy" />
                <h2>Quiz Completed</h2>
                <h2>Results : {sum}/{userAnswers.length}</h2>
                <div id="answer">
                    <button className="custombutton" onClick={reset}>Retry</button>
                </div>
            </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5)




    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

};
