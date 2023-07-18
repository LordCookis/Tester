import { useEffect, useState } from "react" 
import { useRouter } from 'next/router'

export default function test() {
  const [test, setTest] = useState({
    name: "",
    type: true,
    owner: "",
    questions: [{
      id: 0,
      textQ: "",
      answers: [{
        id: 0,
        textA: "",
        state: false
      },
      {
        id: 0,
        textA: "",
        state: false
      }]
    }]
  })
  const [checkAnswer, setCheckAnswer] = useState([])
  const [numQ, setNumQ] = useState(0)
  const router = useRouter()
  const { id } = router.query

  useEffect(()=>{
    thisTest()
  }, [])

  const thisTest = async() => {
    const result = await fetch(`/api/tests?id=${id}`,{
      method: 'GET'
    })
    const data = await result.json()
    setTest(data)
    setCheckAnswer(Array(data.questions.length).fill(null))
  }

  const selectAnswer = (id) => {
    const result = [...checkAnswer]
    const trueAnswer = result[numQ] || []
    const answerId = trueAnswer.indexOf(id)
    if (answerId >= 0) {
      trueAnswer.splice(answerId, 1)
    } else {
      trueAnswer.push(id)
    }
    result[numQ] = trueAnswer
    setCheckAnswer(result)
  }

  const backQ = () => { numQ ? setNumQ(numQ - 1) : setNumQ(test.questions.length - 1) }

  const nextQ = () => { test.questions.length !== numQ + 1 ? setNumQ(numQ + 1) : setNumQ(0) }

  const closeTest = () => {
    if (confirm("Вы уверены что хотите закрыть тест, данные не сохронятся?")) {
      router.push('http://localhost:3000')
    }
  }

  const endTest = async() => {
    const login = localStorage.getItem('login')
    const owner = test.owner
    const name = test.name
    let trueAnswers = 0
    test.questions.forEach((question, index) => {
      const countTrueA = question.answers.filter((answer) => answer.state).length === checkAnswer[index].length
      const result =
        countTrueA && question.answers.filter((answer) => answer.state).every((answer) =>
          checkAnswer[index].includes(answer.id)
        )
        result ? trueAnswers++ : null
    })
    const countAnswers = test.questions.length
    await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login, trueAnswers, countAnswers, owner, id, name}),
    })
    router.push('http://localhost:3000')
  }

  return(
    <div className="testDivPage">
      <span className="testName">{test.name}</span>
      <span className="testQuestion">{test.questions[numQ].textQ}</span>
      <div className="answerDiv">
        {test.questions[numQ].answers.map((answer) => (
        <button className={`${checkAnswer[numQ]?.includes(answer.id) ? `trueAnswer` : `testAnswer`}`} onClick={()=>selectAnswer(answer.id)}>{answer.textA}</button>
        ))}
      </div>
      <div className="divPage">
        <button className="buttonPage" onClick={backQ}>НАЗАД</button>
        <button className="buttonExit" onClick={closeTest}>X</button>
        <button className="buttonPage" onClick={nextQ}>ДАЛЕЕ</button>
      </div>
      <span className="span">{numQ + 1} / {test.questions.length}</span>
      <button className="buttonEnd" onClick={endTest}>ЗАВЕРШИТЬ</button>
    </div>
  )
}