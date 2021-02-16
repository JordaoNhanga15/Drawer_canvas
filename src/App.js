import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  
  const canvasRef=useRef(null)
  const contextRef=useRef(null)

  const [isDrawing,setIsDrawing]=useState(false)
  const [Color,setColor]=useState('')
  
  

  function Handle(){
    const html={
      colorElement:document.getElementById("color")
    }
    function Init(){
      const canva=canvasRef.current;
      canva.width=window.innerWidth * 2
      canva.height=window.innerHeight * 2
      canva.style.height=`${window.innerHeight}px`
      canva.style.width=`${window.innerWidth}px`

      const context=canva.getContext("2d")
      context.scale(2,2)
      contextRef.current=context;
      context.lineCap="round"
      context.lineWidth=5
      html.colorElement.addEventListener("change", (event) => {
        setColor(event.target.value)
      });
    }
    return{
      Init
    }
  }

  // useEffect(()=>{
  //   console.log(Color)
  // },[Color])

  useEffect(()=>{
    const canva=canvasRef.current;
    

    const context=canva.getContext("2d")
    context.fillStyle = Color;
    context.strokeStyle=Color;
  },[Color])

  useEffect(()=>{
    const ht=Handle()
    ht.Init()
  },[])

  const startDrawing =({nativeEvent})=>{
    const {offsetX,offsetY}=nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }
  const finishDrawing =()=>{
    contextRef.current.closePath()
    setIsDrawing(false)
  }
  const Draw =({nativeEvent})=>{
    if(!isDrawing){
      return
    }
    const {offsetX,offsetY}=nativeEvent
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()
  }
  return (
        <>
        <header className="header">
         <h2>Selecione a cor</h2> <input type="color" id="color" />
        </header>
        <section className="section">
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={Draw}
            ref={canvasRef}
          />
        </section>
        </>
  );
}

export default App;
