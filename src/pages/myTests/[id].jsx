import { useEffect, useState } from "react" 
import { useRouter } from 'next/router'
import Link from "next/link"
import { convertDate } from "@/utils/convertDate"

export default function myTest() {
  const [statistic, setStatistic] = useState([])
  const [type, setType] = useState(0)
  const [typeText, setTypeText] = useState([
    "A-Z",
    "Z-A",
    "НОВЫЕ",
    "СТАРЫЕ",
    "ПРАВИЛЬНЫЕ",
    "НЕПРАВИЛЬНЫЕ"
  ])
  const [text, setText] = useState("")
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) { localStorage.setItem('thisId', id) }
    const thisid = localStorage.getItem('thisId')
    thisid ? allStatistic(thisid).then(allStatistic(thisid)) : allStatistic()
  }, [])

  const allStatistic = async(id) => {
    const result = await fetch(`../api/results?testId=${id}`,{
      method: 'GET'
    })
    const data = await result.json()
    setStatistic(data.result)
  }

  const nextType = async() => {
    type !== 5 ? setType(type + 1) : setType(0)
  }

  useEffect(() => {
    search()
  }, [type])

  const search = async() => {
    let url = `../api/results?testId=${id}&`
    if (text) {
      url += `text=${text}&`
    }
    const result = await fetch(url, {
      method: 'GET',
    })
    const data = await result.json()
    let sorted = data.result
    switch (type) {
      case 0:
        sorted = sorted.sort((a, b) => b.login.localeCompare(a.login))
        break
      case 1:
        sorted = sorted.sort((a, b) => b.login.localeCompare(a.login)).reverse()
        break
      case 2:
        sorted = sorted.sort((a, b) => b.date - a.date)
        break
      case 3:
        sorted = sorted.sort((a, b) => b.date - a.date).reverse()
        break
      case 4:
        sorted = sorted.sort((a, b) => a.trueAnswers - b.trueAnswers)
        break
      case 5:
        sorted = sorted.sort((a, b) => a.trueAnswers - b.trueAnswers).reverse()
        break
      default:
        break
    }
    setStatistic(sorted)
  }

  return(
    <div className="myTestDivPage">
      <Link href={`./editTest/${id}`} className="link">РЕДАКТИРОВАТЬ ТЕСТ</Link>
      <span className="span">СТАТИСТИКА</span>
      <div className='filterDiv'>
        <form className='findDiv' onSubmit={(e)=>{e.preventDefault(); search()}}>
          <input className='input' value={text} placeholder='ПОИСК' onChange={(e)=>setText(e.target.value)}/>
          <button className='button'>НАЙТИ</button>
        </form>
        <div className='typeDiv'>
          <button className='button' onClick={nextType}>{typeText[type]}</button>
        </div>
      </div>
      <div className="statisticDiv">
      {statistic.map((result) => (
        <div className="resultsDiv">
          <span>Прошел: {result.login}</span>
          <span>Тест: {result.testName}</span>
          <span>Правильных ответов: {result.trueAnswers} / {result.countAnswers}</span>
          <span>Дата: {convertDate(result.date)}</span>
        </div> 
      )).reverse()}
      </div>
    </div>
  )
}