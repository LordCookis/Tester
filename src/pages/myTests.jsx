import { useState, useEffect } from "react"

export default function myTests() {
  const [tests, setTests] = useState([])
  const [type, setType] = useState(0)
  //const [login, setLogin] = useState("")

  useEffect(()=>{
    myTests()
  }, [])

  const myTests = async() => {
    const owner = localStorage.getItem('login')
    const result = await fetch(`/api/tests?owner=${owner}`,{
      method: 'GET'
    })
    const data = await result.json()
    setTests(data.result)
  }

  return (
    <div className='mainPage'>
      <div className='filterDiv'>
        <div className='findDiv'>
          <input className='input' placeholder='ПОИСК'/>
          <button className='button'>НАЙТИ</button>
        </div>
        <div className='typeDiv'>
          {type === 0 ?
          <button className='button' onClick={()=>setType(1)}>ВСЕ</button>
          : type === 1 ?
          <button className='button' onClick={()=>setType(2)}>ОТКРЫТЫЕ</button>
          :
          <button className='button' onClick={()=>setType(0)}>ЗАКРЫТЫЕ</button>
          }
        </div>
      </div>
    <div className='mainDivPage'>
      {tests.map((test) => (
      <div className='testDiv'>
        <span className='spanName'>{test.name}</span>
        <span className='span'>Вопросов: {test.questions.length}</span>
        <span className='span'>Автор: {test.owner}</span>
      </div>
      )).reverse()}
    </div>
    </div>
  )
}