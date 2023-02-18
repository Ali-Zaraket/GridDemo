import { useRef, useState } from 'react'
import Grid2 from './components/Grid2'
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"

export default function App(){
  const [inEditingMode, setInEditingMode] = useState(false)

  const dropdownRef = useRef()

  function handleClick() {
    const opened = dropdownRef.current.getAttribute("aria-expanded")
    if(opened === "true") {
      dropdownRef.current.setAttribute("aria-expanded", "false")
    } else {
      dropdownRef.current.setAttribute("aria-expanded", "true")
    }
  }

  function openEditingMode() {
    if(inEditingMode) {
      const res = confirm("Are you sure you want to turn edit mode without saving ?")
      if(res) {
        setInEditingMode(false)
      }
    }
    else setInEditingMode(true)
    handleClick()
  }

  return (
    <>
      <div className='control-card'>
        <div className='inner'>
          <legend>Dashboard name</legend>
          <div className='controls'>
            <div className='icon' onClick={handleClick}>i</div>
            <div className='dropdown' aria-expanded="false" ref={dropdownRef}>
              <div onClick={handleClick}>add to favs</div>
              <div onClick={openEditingMode}>{ inEditingMode ? "Edit layout: on" : "Edit layout: off" }</div>
            </div>
          </div>
        </div>
      </div>
      <Grid2 editable={inEditingMode} turnOffEditing={() => setInEditingMode(false)} />
    </>
  )
}