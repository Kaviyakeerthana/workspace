import React from 'react'

function Kaviya() {
    const [Countts1,setCounts1]=usestate(0)
    function myfunc(){
        setCounts1(Countts1+1)
    }
    function myfunc2(){
        setCounts1(Countts1-1);
    }
    function myfunc3(){
        setCounts1(Countts1+1);
    }

  return (
    <>
    <button onClick={myfunc}>increse</button>
    <span>Counts1</span>
    <button onClick={myfunc2}>decrese</button>
    <span>Counts1</span>
    <button onMouseOver={myfunc3}>over</button>
    </>
  )
  }
  export default Kaviya
