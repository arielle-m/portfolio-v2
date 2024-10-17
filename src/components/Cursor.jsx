import React from 'react'

export default function Cursor() {

    const mainCursor = React.useRef(null)
    const secondaryCursor = React.useRef(null)
    const positionRef = React.useRef({
        mouseX: 0, // current position
        mouseY: 0,
        destinationX: 0, // next position
        destinationY: 0,
        distanceX: 0, // distance between current and next position
        distanceY: 0,
        key: -1
    })

    React.useEffect(()=>{
        document.addEventListener('mousemove', (event)=>{
            const {clientX, clientY} = event
            
            const mouseX = clientX
            const mouseY = clientY

            positionRef.current.mouseX = mouseX - secondaryCursor.current.clientWidth / 2
            positionRef.current.mouseY = mouseY - secondaryCursor.current.clientHeight / 2
            
            mainCursor.current.style.transform = `translate3d(${mouseX - mainCursor.current.clientWidth / 2}px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`


        })
    }, [])

    React.useEffect(()=>{
        const followMouse = () => {

            positionRef.current.key = requestAnimationFrame(followMouse)

            const {
                mouseX, 
                mouseY, 
                destinationX, 
                destinationY, 
                distanceX, 
                distanceY
            } = positionRef.current

            if(!destinationX || !destinationY) { 
                // if current position is not equal to the destination
                positionRef.current.destinationX = mouseX
                positionRef.current.destinationY = mouseY
            } else {
                positionRef.current.distanceX = (mouseX - destinationX) * 0.03
                positionRef.current.distanceY = (mouseY - destinationY) * 0.03

                if(Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.01) {
                    positionRef.current.destinationX = mouseX
                    positionRef.current.destinationY = mouseY
                } else {
                    positionRef.current.destinationX += distanceX
                    positionRef.current.destinationY += distanceY
                }
            }

            secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
        }

        followMouse()
    }, [])

    return (
        <div>
            <div className="main-cursor h-4 w-4 bg-orange-500 z-50 fixed rounded-full pointer-events-none overflow-hidden" ref={mainCursor}></div>
            <div className="secondary-cursor h-10 w-10 border-orange-500 border z-50 fixed rounded-full pointer-events-none overflow-hidden" ref={secondaryCursor}>
                <div className=""></div>
            </div>
        </div>
    )
}