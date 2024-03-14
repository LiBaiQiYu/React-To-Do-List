import React from "react";
import { TextField, Button } from '@mui/material';

export default function Top(props: { state: { inputValue: string; setInputValue: React.Dispatch<React.SetStateAction<string>>; addList: () => void; }; }) {
  const { inputValue, setInputValue, addList } = props.state;
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