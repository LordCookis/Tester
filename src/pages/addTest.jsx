import { useEffect, useState } from "react"
import { randomNumber } from "@/utils/randomNumber"

export default function addTest() {
  const [test, setTest] = useState({
    name: "",
    type: true,
    owner: "",
    questions: [{
      id: randomNumber(1000,9999),
      textQ: "",
      answers: [{
        id: randomNumber(1000,9999),
        textA: "",
        state: false
      },
      {
        id: randomNumber(1000,9999),
        textA: "",
        state: false
      }]
    }]
  })
  const [numQ, setNumQ] = useState(0)
  const [error, setError] = useState("")

useEffect (() => {
  setTest({...test, owner: localStorage.getItem('login')})
}, [])

const valueQuestion = (e) => {
  setTest({
    ...test,
    questions: test.questions.map((question, index) =>
      index === numQ ? {...question, textQ: e.target.value} : question
    )
  })
}

const valueAnswer = (e, numA) => {
  setTest({
    ...test,
    questions: test.questions.map((question, index) => 
      index === numQ ? {
        ...question, 
        answers: question.answers.map((answer, i) => 
          i === numA ? {
            ...answer, 
            textA: e.target.value 
          }
          : answer)
      } : question
    )
  })
}

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
  }

  const delAnswer = (id) => {
    test.questions[numQ].answers.length > 2 ?
    setTest({
      ...test,
      questions: 
        test.questions.map((question, index) => index === numQ ?
        {
          ...question,
          answers: test.questions[numQ].answers.filter((answer) => answer.id !== id)
        } : question)
    }) : setError("Ошибка: нужно минимум два ответа")
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
          },
          {
            id: randomNumber(1000,9999),
            textA: "",
            state: false
          }]
        }
      ]
    })
  }

  const delQuestion = () => {
    if (test.questions.length !== 1) {
      setTest({
        ...test,
        questions: test.questions.filter((question) => question.id !== test.questions[numQ].id)
      })
      numQ !== 0 ? setNumQ(numQ - 1) : setNumQ(0)
    } else {setError("Ошибка: нужен минимум один вопрос")}
  }

  const backQ = () => {
    numQ ? setNumQ(numQ - 1) : setNumQ(test.questions.length - 1)
  }

  const nextQ = () => {
    test.questions.length !== numQ + 1 ? setNumQ(numQ + 1) : setNumQ(0)
  }

  const newTest = async() => {
    if (test.name === "") {
      setError("Ошибка: введите название теста")
    } else if (test.questions[numQ].textQ === "") {
      setError("Ошибка: заполните поле с вопросом")
    } else if (test.questions[numQ].answers.filter((answer) => answer.textA.length === 0).length !== 0) {
      setError("Ошибка: заполните поле с ответом")
    } else if (test.questions.some((question) => question.answers.filter((answer) => answer.state === true).length === 0)) {
      setError("Ошибка: нужен минимум один правильный ответ")
    } else {
      await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({test}),
      })
      setNumQ(0)
      setTest({
        name: "",
        type: true,
        owner: localStorage.getItem('login'),
        questions: [{
          id: randomNumber(1000,9999),
          textQ: "",
          answers: [{
            id: randomNumber(1000,9999),
            textA: "",
            state: false
          },
          {
            id: randomNumber(1000,9999),
            textA: "",
            state: false
          }]
        }]
      })
    }
  }

  return(
    <div className="addDivPage">
      <input className="inputName" placeholder="НАЗВАНИЕ ТЕСТА" value={test.name} onChange={(e)=>setTest({...test, name: e.target.value})}/>
      <div className="addTestDiv">
        <div className="questionDiv">
          {test.type ? 
          <img src="/off.svg" alt="" className="publicTest" onClick={()=>setTest({...test, type: false})}/> :
          <img src="/on.svg" alt="" className="privateTest" onClick={()=>setTest({...test, type: true})}/>}
          <input className="inputQuestion" placeholder="Введите вопрос" value={test.questions[numQ].textQ} onChange={(e)=>valueQuestion(e)}/>
          <img src="/delete.svg" alt="" className="delQuestion" onClick={delQuestion}/>
        </div>
        {test.questions[numQ].answers.map((answer, index) => (
        <div className="answerDiv">
          {!answer.state ?
          <img src="/false.svg" alt="" className="falseAnswer" onClick={()=>checkAnswer(answer.id)}/> :
          <img src="/true.svg" alt="" className="trueAnswer" onClick={()=>checkAnswer(answer.id)}/>}
          <input className="inputAnswer" placeholder="Введите ответ" value={answer.textA} onChange={(e)=>valueAnswer(e, index)}/>
          <img src="/delete.svg" alt="" className="delAnswer" onClick={()=>delAnswer(answer.id)}/>
        </div>))}
        <button className="button" onClick={newAnswer}>+</button>
        <div className="divPage">
          <button className="buttonPage" onClick={backQ}>НАЗАД</button>
          <button className="addQuestion" onClick={newQuestion}>+</button>
          <button className="buttonPage" onClick={nextQ}>ДАЛЕЕ</button>
        </div>
        <span>{numQ + 1} / {test.questions.length}</span>
        <button className="button" onClick={newTest}>СОЗДАТЬ ТЕСТ</button>
      </div>
      <span className="errorSpan">{error}</span>
    </div>
  )
}