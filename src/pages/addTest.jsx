import { useState } from "react"
import { randomNumber } from "@/utils/randomNumber"

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
  const [numA, setNumA] = useState(0)

  const newAnswer = () => {
    setTest({
      ...test,
      questions: [{
        ...test.questions[numA],
        answers: test.questions[numA].answers.concat({
          id: randomNumber(1000,9999),
          textA: "",
          state: false
        })
      }]
    })
  }

  const delAnswer = (id) => {
    setTest({
      ...test,
      questions: [{
        ...test.questions[numA],
        answers: test.questions[numA].answers.filter((answer) => answer.id !== id)
      }]
    })
  }

  const checkAnswer = (id) => {
    setTest({
      ...test,
      questions: [{
        ...test.questions[numA],
        answers: test.questions[numA].answers.map((answer) => answer.id === id && !answer.state ? {...answer, state: true} : {...answer, state: false})
      }]
    })
  }

  const newQuestion = async() => {

  }

  const backQ = () => {
    numA ? setNumA(numA - 1) : setNumA(Object.keys(test).length - 1)
  }

  const nextQ = () => {
    setNumA(numA + 1)
  }



  const addTest = async() => {

  }

  const testF = () => {
    console.log(test)
  }

  return(
    <div className="addDivPage">
      <input className="inputName" placeholder="НАЗВАНИЕ ТЕСТА" onChange={(e)=>setTest({...test, name: e.target.value})}/>
      <div className="addTestDiv">
        <input className="input" placeholder="Введите вопрос" onChange={(e)=>setTest({...test.questions[numQ], textQ: e.textQ.value})}/>
        <button className="delQuestion">x</button>
        {test.questions[numA].answers.map((answer) => (
        <div className="answerDiv">
          {!answer.state ?
          <button className="falseAnswer" onClick={()=>checkAnswer(answer.id)}>-</button>
          :
          <button className="trueAnswer" onClick={()=>checkAnswer(answer.id)}>ъ</button>
          }
        <input className="inputAnswer" placeholder="Введите ответ"/>
        <button className="delAnswer" onClick={()=>delAnswer(answer.id)}>x</button>
        </div>))}
        <button className="button" onClick={newAnswer}>+</button>
        <div className="divPage">
          <button className="buttonPage" onClick={backQ}>НАЗАД</button>
          <button className="addQuestion" onClick={newQuestion}>+</button>
          <button className="buttonPage" onClick={nextQ}>ДАЛЕЕ</button>
        </div>
        <button className="button" onClick={addTest}>СОЗДАТЬ ТЕСТ</button>
      </div>
      <button onClick={testF}>првоирка фич</button>
    </div>
  )
}