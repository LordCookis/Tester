import { useEffect, useState } from "react" 
import { useRouter } from 'next/router'

export default function test() {
  const [test, setTest] = useState({})
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
    //console.log(data)
  }

  return(
    <div className="testDivPage">
      <span className="testName">{test.name}</span>
      <span className="testQuestion">{/*test.questions[numQ].textQ*/console.log(test.questions)}</span>
      <div className="answerDiv">
        {test.questions[numQ].answers.map((answer) => (
        <button className="testAnswer">{answer.textA}</button>
        ))}
      </div>
      <div className="divPage">
        <button className="buttonPage">НАЗАД</button>
        <button className="buttonExit">X</button>
        <button className="buttonPage">ДАЛЕЕ</button>
      </div>
      <span className="span">1 / 5</span>
      <button className="buttonEnd">ЗАВЕРШИТЬ</button>
    </div>
  )
}