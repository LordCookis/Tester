import { useEffect, useState } from "react" 
import { useRouter } from 'next/router'

export default function myTest() {
  const [statistic, setStatistic] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(()=>{
    allStatistic()
  }, [])

  const allStatistic = async() => {
    const result = await fetch(`../api/results?testId=${id}`,{
      method: 'GET'
    })
    const data = await result.json()
    setStatistic(data.result)
    console.log(statistic)
    console.log(data)
  }

  return(
    <div className="myTestDivPage">
      <button className="button">РЕДАКТИРОВАТЬ ТЕСТ</button>
      <span className="span">СТАТИСТИКА</span>
      {statistic.map((result) => (
        <div className="resultsDiv">
          <span>Прошел: {result.login}</span>
          <span>Тест: {result.testName}</span>
          <span>Правильных ответов: {result.trueAnswers} / {result.countAnswers}</span>
          <span>Дата прохождения: {result.date}</span>
        </div>
      )).reverse()}
    </div>
  )
}