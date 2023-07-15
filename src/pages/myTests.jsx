import { useState, useEffect } from "react"

export default function myTests() {
  const [tests, setTests] = useState([])
  const [type, setType] = useState(undefined)
  const [text, setText] = useState("")

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

  const nextType = () => {
    type === undefined ? setType(true) : type === true ? setType(false) : setType(undefined)
  }

  const search = async(e) => {
    const owner = localStorage.getItem('login')
    let url = `/api/tests?owner=${owner}&`
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

  const deleteTest = async(id) => {
    await fetch(`/api/tests?id=${id}`, {
      method: 'DELETE',
    })
    search()
  }

  return (
    <div className='mainPage'>
      <div className='filterDiv'>
        <form className='findDiv' onSubmit={(e)=>{e.preventDefault(); search()}}>
          <input className='input' value={text} placeholder='ПОИСК' onChange={(e)=>setText(e.target.value)}/>
          <button className='button'>НАЙТИ</button>
        </form>
        <div className='typeDiv't>
          <button className='button' onClick={()=>{nextType(); search()}}>{type === undefined ? 'ВСЕ' : type === true ? 'ОТКРЫТЫЕ' : 'ЗАКРЫТЫЕ'}</button>
        </div>
      </div>
    <div className='mainDivPage'>
      {tests.map((test) => (
      <div className='testDiv'>
        <span className='spanName'>{test.name}</span>
        <span className='span'>Вопросов: {test.questions.length}</span>
        <span className='span'>Автор: {test.owner}</span>
        {!test.type ? <div className='closeTest'>З</div> : null}
        <div className='deleteTest' onClick={deleteTest(test._id)}>Х</div>
      </div>
      )).reverse()}
    </div>
    </div>
  )
}