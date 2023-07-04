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
    const result = await fetch(`/api/tests?type=${true}`)
    setTests(result)
  }

  return (
    <>
      {tests.map(() => (
      <div className='mainDiv'>
        <div className='test'>
          <span className='span'>ТЕСТ НА ГЕЯ</span>
          <span className='span'>Автор: Абобик</span>
          <span className='span'>Вопросов: 15</span>
        </div>
      </div>
      ))}
    </>
  )
}