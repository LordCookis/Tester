import { useState } from "react"
import { randomNumber } from "@/utils/randomNumber"
import { set } from "mongoose"

export default function addTest() {
  const [test, setTest] = useState({
    name: "",
    questions: [{
      id: randomNumber(1000,9999),
      textQ: "",
      answers: [{
        id: randomNumber(1000,9999),
        textA: "",
        state: false
      }]
    }]
  })
  const [numQ, setNumQ] = useState(0)
  const [error, setError] = useState("")

  const newAnswer = () => {
    setTest({
      ...test,
      questions: 
        test.questions.map((question, index) => index === numQ ? 
        {
          ...question,
          answers: [
            ...question.answers,
            {
              id: randomNumber(1000, 9999),
              textA: "",
              state: false
            }
          ]
        } : question)
    })
    setError("Ошибка: это ROFLS")
  }

  const delAnswer = (id) => {
    setTest({
      ...test,
      questions: 
        test.questions.map((question, index) => index === numQ ?
        {
          ...question,
          answers: test.questions[numQ].answers.filter((answer) => answer.id !== id)
        } : question)
    })
  }

  const checkAnswer = (id) => {
    setTest({
      ...test,
      questions: 
        test.questions.map((question, index) => index === numQ ?
        {
          ...question,
          answers: test.questions[numQ].answers.map((answer) => answer.id === id ? { ...answer, state: !answer.state } : answer)
        } : question)
    })
  }

  const newQuestion = async() => {
    setTest({
      ...test,
      questions: [
        ...test.questions,
        {
          id: randomNumber(1000, 9999),
          textQ: "",
          answers: [{
              id: randomNumber(1000, 9999),
              textA: "",
              state: false
          }]
        }
      ]
    })
  }

  const delQuestion = () => {
    if (test.questions.length != 1) {
      setTest({
        ...test,
        questions: test.questions.filter((question) => question.id !== test.questions[numQ].id)
      })
      numQ != 0 ? setNumQ(numQ - 1) : setNumQ(0)
    } else {setError("Ошибка: нужен минимум один вопрос")}
  }

  const backQ = () => {
    numQ ? setNumQ(numQ - 1) : setNumQ(test.questions.length - 1)
  }

  const nextQ = () => {
    test.questions.length != numQ + 1 ? setNumQ(numQ + 1) : setNumQ(0)
  }

  const addTest = async() => {

  }

  return(
    <div className="addDivPage">
      <input className="inputName" placeholder="НАЗВАНИЕ ТЕСТА" onChange={(e)=>setTest({...test, name: e.target.value})}/>
      <div className="addTestDiv">
        <div className="questionDiv">
          <input className="inputQuestion" placeholder="Введите вопрос" onChange={(e)=>setTest({...test, questions: [{...test.questions[numQ], textQ: e.target.value}]})}/>
          <button className="delQuestion" onClick={delQuestion}>x</button>
        </div>
        {test.questions[numQ].answers.map((answer) => (
        <div className="answerDiv">
          {!answer.state ?
          <button className="falseAnswer" onClick={()=>checkAnswer(answer.id)}>-</button> :
          <button className="trueAnswer" onClick={()=>checkAnswer(answer.id)}>ъ</button>}
        <input className="inputAnswer" placeholder="Введите ответ"/>
        <button className="delAnswer" onClick={()=>delAnswer(answer.id)}>x</button>
        </div>))}
        <button className="button" onClick={newAnswer}>+</button>
        <div className="divPage">
          <button className="buttonPage" onClick={backQ}>НАЗАД</button>
          <button className="addQuestion" onClick={newQuestion}>+</button>
          <button className="buttonPage" onClick={nextQ}>ДАЛЕЕ</button>
        </div>
        <span>{numQ + 1} / {test.questions.length}</span>
        <button className="button" onClick={addTest}>СОЗДАТЬ ТЕСТ</button>
      </div>
      <span className="errorSpan">{error}</span>
    </div>
  )
}