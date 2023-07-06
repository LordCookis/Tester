import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [tests, setTests] = useState([])

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

  return (
    <div className='mainDivPage'>
      {tests.map((test) => (
      <div className='testDiv'>
        <span className='spanName'>{test.name}</span>
        <span className='span'>Вопросов: {test.questions.length}</span>
        <span className='span'>Автор: {test.owner}</span>
      </div>
      ))}
    </div>
  )
}