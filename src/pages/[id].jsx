export default function test() {

  return(
    <div className="testDivPage">
      <span className="testName">Тест на гея</span>
      <span className="testQuestion">Ты питонист?</span>
      <div className="answerDiv">
        <button className="testAnswer">Да</button>
        <button className="testAnswer">Нет</button>
        <button className="testAnswer">Я в этом никогда ни сомневался</button>
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