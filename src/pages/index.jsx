import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [tests, setTests] = useState([])
  const [type, setType] = useState(null)
  const [text, setText] = useState("")
  const [role, setRole] = useState(false)

  useEffect(()=>{
    allTests()
  }, [])

  const allTests = async() => {
    const login = localStorage.getItem('login')
    const result = await fetch(`/api/tests`,{
      method: 'GET'
    })
    const data = await result.json()
    setTests(data.result.filter((test) => test.owner !== login))
    const resultS = await fetch(`/api/users?login=${login}`,{
      method: 'GET'
    })
    const dataS = await resultS.json()
    setRole(dataS.result.role)
  }

  const nextType = () => {
    type === null ? setType(true) : type === true ? setType(false) : setType(null)
  }

  useEffect(() => {
    search()
  }, [type])

  const search = async() => {
    const login = localStorage.getItem('login')
    let url = '/api/tests?'
    if (type !== null) {
      url += `type=${type}&`
    }
    if (text) {
      url += `text=${text}&`
    }
    const result = await fetch(url, {
      method: 'GET',
    })
    const data = await result.json()
    setTests(data.result.filter((test) => test.owner !== login))
  }

  const deleteTest = async(id) => {
    await fetch(`/api/tests?id=${id}`, {
      method: 'DELETE',
    }).then(allTests())
  }

  return (
    <div className='mainPage'>
      <div className='filterDiv'>
        <form className='findDiv' onSubmit={(e)=>{e.preventDefault(); search()}}>
          <input className='input' value={text} placeholder='ПОИСК' onChange={(e)=>setText(e.target.value)}/>
          <button className='button'>НАЙТИ</button>
        </form>
        <div className='typeDiv'>
          <button className='button' onClick={nextType}>{type === null ? 'ВСЕ' : type === true ? 'ОТКРЫТЫЕ' : 'ЗАКРЫТЫЕ'}</button>
        </div>
      </div>
    <div className='mainDivPage'>
      {tests.map((test) => (
      <div className="mainDiv">
        {role ? <img src="/delete.svg" alt="" className='deleteTest' onClick={()=>deleteTest(test._id)}/> : null}
        <Link className="link" href={`./${test._id}`} key={test._id}>
          <div className='testDiv'>
            <span className='spanName'>{test.name}</span>
            <span className='span'>Вопросов: {test.questions.length}</span>
            <span className='span'>Автор: {test.owner}</span>
            {!test.type ? <div className='closeTest'>З</div> : null}
          </div>
        </Link>
      </div>
      )).reverse()}
    </div>
    </div>
  )
}