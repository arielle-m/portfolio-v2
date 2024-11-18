import React from 'react'

export default function Cursor() {

    const mainCursor = React.useRef(null)
    // const secondaryCursor = React.useRef(null)
    const duckHeadCursor = React.useRef(null)
    const duckBodyCursor = React.useRef(null)
    const duckBillCursor = React.useRef(null)

    // const positionRef = React.useRef({
    //     mouseX: 0, // current position
    //     mouseY: 0,
    //     destinationX: 0, // next position
    //     destinationY: 0,
    //     distanceX: 0, // distance between current and next position
    //     distanceY: 0,
    //     key: -1
    // })
    const duckHeadRef = React.useRef({
        mouseX: 0,
        mouseY: 0,
        duckHeadDestinationX: 0,
        duckHeadDestinationY: 0,
        duckHeadDistanceX: 0,
        duckHeadDistanceY: 0,
        key: -1
    })
    const duckBodyRef = React.useRef({
        mouseX: 0,
        mouseY: 0,
        duckBodyDestinationX: 0,
        duckBodyDestinationY: 0,
        duckBodyDistanceX: 0,
        duckBodyDistanceY: 0,
        key: -1
    })
    const duckBillRef = React.useRef({
        mouseX: 0,
        mouseY: 0,
        duckBillDestinationX: 0,
        duckBillDestinationY: 0,
        duckBillDistanceX: 0,
        duckBillDistanceY: 0,
        key: -1
    })

    React.useEffect(()=>{
        document.addEventListener('mousemove', (event)=>{
            const {clientX, clientY} = event
            
            const mouseX = clientX
            const mouseY = clientY

            // positionRef.current.mouseX = mouseX - secondaryCursor.current.clientWidth / 2
            // positionRef.current.mouseY = mouseY - secondaryCursor.current.clientHeight / 2

            duckHeadRef.current.mouseX = mouseX - duckHeadCursor.current.clientWidth / 2
            duckHeadRef.current.mouseY = mouseY - duckHeadCursor.current.clientHeight / 2

            duckBodyRef.current.mouseX = mouseX - duckBillCursor.current.clientWidth / 2
            duckBodyRef.current.mouseY = mouseY - duckBillCursor.current.clientHeight / 2

            duckBillRef.current.mouseX = mouseX - duckBillCursor.current.clientWidth / 2
            duckBillRef.current.mouseY = mouseY - duckBillCursor.current.clientHeight / 2
            
            mainCursor.current.style.transform = `translate3d(${mouseX - mainCursor.current.clientWidth / 2}px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`
        })
    }, [])

    // React.useEffect(()=>{
    //     const followMouse = () => {

    //         positionRef.current.key = requestAnimationFrame(followMouse)

    //         const {
    //             mouseX, 
    //             mouseY, 
    //             destinationX, 
    //             destinationY, 
    //             distanceX, 
    //             distanceY
    //         } = positionRef.current

    //         if(!destinationX || !destinationY) { 
    //             // if current position is not equal to the destination
    //             positionRef.current.destinationX = mouseX
    //             positionRef.current.destinationY = mouseY
    //         } else {
    //             positionRef.current.distanceX = (mouseX - destinationX) * 0.03
    //             positionRef.current.distanceY = (mouseY - destinationY) * 0.03

    //             if(Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.01) {
    //                 positionRef.current.destinationX = mouseX
    //                 positionRef.current.destinationY = mouseY
    //             } else {
    //                 positionRef.current.destinationX += distanceX
    //                 positionRef.current.destinationY += distanceY
    //             }
    //         }

    //         secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
    //     }

    //     followMouse()
    // }, [])

    React.useEffect(()=>{
        const duckHeadFollowMouse = () => {

            duckHeadRef.current.key = requestAnimationFrame(duckHeadFollowMouse)

            const {
                mouseX, 
                mouseY, 
                duckHeadDestinationX, 
                duckHeadDestinationY, 
                duckHeadDistanceX, 
                duckHeadDistanceY
            } = duckHeadRef.current

            if(!duckHeadDestinationX || !duckHeadDestinationY) {
                duckHeadRef.current.duckHeadDestinationX = mouseX
                duckHeadRef.current.duckHeadDestinationY = mouseY
            } else {
                duckHeadRef.current.duckHeadDistanceX = (mouseX - duckHeadDestinationX) * 0.0255
                duckHeadRef.current.duckHeadDistanceY = (mouseY - duckHeadDestinationY) * 0.025

                if(Math.abs(duckHeadRef.current.duckHeadDistanceX) + Math.abs(duckHeadRef.current.duckHeadDistanceY) < 0.01) {
                    duckHeadRef.current.duckHeadDestinationX = mouseX
                    duckHeadRef.current.duckHeadDestinationY = mouseY
                } else {
                    duckHeadRef.current.duckHeadDestinationX += duckHeadDistanceX
                    duckHeadRef.current.duckHeadDestinationY += duckHeadDistanceY
                }
            }

            duckHeadCursor.current.style.transform = `translate3d(${duckHeadDestinationX}px, ${duckHeadDestinationY}px, 0)`
        }

        duckHeadFollowMouse()
    }, [])

    React.useEffect(()=>{
        const duckBodyFollowMouse = () => {

            duckBodyRef.current.key = requestAnimationFrame(duckBodyFollowMouse)

            const {
                mouseX, 
                mouseY, 
                duckBodyDestinationX, 
                duckBodyDestinationY, 
                duckBodyDistanceX, 
                duckBodyDistanceY
            } = duckBodyRef.current

            if(!duckBodyDestinationX || !duckBodyDestinationY) {
                duckBodyRef.current.duckBodyDestinationX = mouseX
                duckBodyRef.current.duckBodyDestinationY = mouseY
            } else {
                duckBodyRef.current.duckBodyDistanceX = (mouseX - duckBodyDestinationX) * 0.0243
                duckBodyRef.current.duckBodyDistanceY = (mouseY - duckBodyDestinationY) * 0.0243

                if(Math.abs(duckBodyRef.current.duckBodyDistanceX) + Math.abs(duckBodyRef.current.duckBodyDistanceY) < 0.01) {
                    duckBodyRef.current.duckBodyDestinationX = mouseX
                    duckBodyRef.current.duckBodyDestinationY = mouseY
                } else {
                    duckBodyRef.current.duckBodyDestinationX += duckBodyDistanceX
                    duckBodyRef.current.duckBodyDestinationY += duckBodyDistanceY
                }
            }

            duckBodyCursor.current.style.transform = `translate3d(${duckBodyDestinationX}px, ${duckBodyDestinationY}px, 0)`
        }

        duckBodyFollowMouse()
    }, [])

    React.useEffect(()=>{
        const duckBillFollowMouse = () => {

            duckBillRef.current.key = requestAnimationFrame(duckBillFollowMouse)

            const {
                mouseX, 
                mouseY, 
                duckBillDestinationX, 
                duckBillDestinationY, 
                duckBillDistanceX, 
                duckBillDistanceY
            } = duckBillRef.current

            if(!duckBillDestinationX || !duckBillDestinationY) {
                duckBillRef.current.duckBillDestinationX = mouseX
                duckBillRef.current.duckBillDestinationY = mouseY
            } else {
                duckBillRef.current.duckBillDistanceX = (mouseX - duckBillDestinationX) * 0.0275
                duckBillRef.current.duckBillDistanceY = (mouseY - duckBillDestinationY) * 0.0265

                if(Math.abs(duckBillRef.current.duckBillDistanceX) + Math.abs(duckBillRef.current.duckBillDistanceY) < 0.01) {
                    duckBillRef.current.duckBillDestinationX = mouseX
                    duckBillRef.current.duckBillDestinationY = mouseY
                } else {
                    duckBillRef.current.duckBillDestinationX += duckBillDistanceX
                    duckBillRef.current.duckBillDestinationY += duckBillDistanceY
                }
            }

            duckBillCursor.current.style.transform = `translate3d(${duckBillDestinationX}px, ${duckBillDestinationY}px, 0)`
        }

        duckBillFollowMouse()
    }, [])

    return (
        <div className="z-50">
            {/* <div className="main-cursor h-4 w-4 bg-orange-500 z-50 fixed rounded-full pointer-events-none overflow-hidden" ref={mainCursor}></div> */}
            <div className="main-cursor" ref={mainCursor}></div>
            <div className="duck fixed flex flex-col items-center z-40">
                <div className="duck-bill bg-amber-400 h-2 w-3 rounded-full mt-1 fixed z-40" ref={duckBillCursor}></div>
                <div className="duck-head bg-zinc-50 h-4 w-4 rounded-full fixed z-30" ref={duckHeadCursor}></div>
                <div className="duck-body bg-zinc-50 h-5 w-8 rounded-full mt-2 fixed z-20" ref={duckBodyCursor}></div>
            </div>
            {/* <div className="secondary-cursor min-h-10 min-w-10 border-orange-500 border z-20 fixed rounded-full pointer-events-none flex" ref={secondaryCursor}></div> */}
        </div>
    )
}