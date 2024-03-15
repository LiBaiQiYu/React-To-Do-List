import React, { useRef } from "react";
import { TextField, Button } from '@mui/material';

export default function Top(props: { state: topProps }) {
  const { inputValue, setInputValue, listArr, setListArr, setMsg, setOpen } = props.state;
  const timer = useRef<number[] | undefined[]>([]);
  
  const addList = () => {
    let newItem: Item = {
      inputValue,
      timer,
      checked: false,
    }
    if (inputValue === '') return;
    if (listArr.length === 0) {
      setListArr([...listArr, newItem])
      setInputValue('')
    } else {
      let has = false;
      listArr.forEach(item => {
        if (item.inputValue === inputValue) {
          has = true
        }
      })
      if (!has) {
        setListArr([...listArr, newItem])
        setInputValue('')
      } else {
        setMsg("Already had same item.")
        setOpen(true)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addList()
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField size='small' id="outlined-basic" label="Todo Something" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="input you want to do" variant="outlined" onKeyDown={handleKeyDown} />
      <Button style={{ marginLeft: '20px' }} variant="contained" onClick={addList}>ADD ITEM</Button>
    </div>
  )
}