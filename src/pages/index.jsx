import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [tests, setTests] = useState([])
  const [type, setType] = useState(undefined)
  const [text, setText] = useState("")

  useEffect(()=>{
    allTests()
  }, [])

  const allTests = async() => {
    const result = await fetch('/api/tests',{
      method: 'GET'
    })
    const data = await result.json()
    setTests(data.result)
  }

  const nextType = () => {
    type === undefined ? setType(true) : type === true ? setType(false) : setType(undefined)
  }

  const performSearch = async(e) => {
    let url = '/api/tests?'
    if (type !== undefined) {
      url += `type=${type}&`
    }
    if (text) {
      url += `text=${text}&`
    }
    const result = await fetch(url, {
      method: 'GET',
    })
    const data = await result.json()
    setTests(data.result)
  }

  return (
    <div className='mainPage'>
      <div className='filterDiv'>
        <form className='findDiv' onSubmit={(e)=>{e.preventDefault(); performSearch()}}>
          <input className='input' value={text} placeholder='ПОИСК' onChange={(e)=>setText(e.target.value)}/>
          <button className='button'>НАЙТИ</button>
        </form>
        <div className='typeDiv't>
          <button className='button' onClick={()=>{nextType(); performSearch()}}>{type === undefined ? 'ВСЕ' : type === true ? 'ОТКРЫТЫЕ' : 'ЗАКРЫТЫЕ'}</button>
        </div>
      </div>
    <div className='mainDivPage'>
      {tests.map((test) => (
      <Link className="link" href={`./${test._id}`} key={test.id}>
        <div className='testDiv'>
          <span className='spanName'>{test.name}</span>
          <span className='span'>Вопросов: {test.questions.length}</span>
          <span className='span'>Автор: {test.owner}</span>
        </div>
      </Link>
      )).reverse()}
    </div>
    </div>
  )
}