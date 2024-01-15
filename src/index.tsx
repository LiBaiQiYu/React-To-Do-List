import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button,Checkbox,RadioGroup, FormControlLabel, Radio } from '@mui/material';

function Top(props) {
  const { inputValue, setInputValue, addList } = props.state;
  return (
    <div>
      <TextField id="outlined-basic" label="Input Items" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="input item" variant="outlined" />
      <Button variant="contained" onClick={addList}>ADD ITEM</Button>
      <br></br>
    </div>
  )
}

function TodoList(props) {
  const [value, setValue] = useState("1");
  const { listArr, setListArr } = props.state;
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const checkChange = (key, e) => {
    let newArr = listArr.slice();
    newArr.forEach(item => {
      if (item.key === key) {
        item.checked = !item.checked
      }
    })
    setListArr(newArr);
  }

  let newItem = listArr.filter(item => {
    if (value === "1") {
      return item
    } else if (value === "2") {
      return item.checked
    } else {
      return !item.checked
    }
  }).map(i => <Item state={i} key={i.key} checkChange={(e) => checkChange(i.key, e)} />)
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange} value={value}
      >
        <FormControlLabel value={"1"} control={<Radio />} label="全部" />
        <FormControlLabel value={"2"} control={<Radio />} label="已完成" />
        <FormControlLabel value={"3"} control={<Radio />} label="未完成" />
      </RadioGroup>
      <ul>
        {newItem}
      </ul>
    </div>
  )
}

function Item(props) {
  const { checked, inputValue, deleteItem } = props.state;
  const { checkChange } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (<li style={{ width: '300px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <Checkbox {...label} onClick={checkChange} checked={checked} />
    <div style={{ flex: '1', padding: '0 10px' }}>{inputValue}</div>
    <Button variant="contained" color="error" onClick={() => deleteItem(inputValue)} >DEL ITEM</Button>
  </li>)
}

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState<Item[]>([]);
  const stateRef = useRef<Item[]>([]);

  interface Item {
    inputValue: string,
    deleteItem: any,
    key: string,
    checked: boolean,
  }

  const addList = () => {
    if (inputValue === '') return;
    setListArr([...listArr, itemProps])
    setInputValue('')
  }

  const deleteItem = (itemKey: string) => {
    const newArr = stateRef.current.filter((val) => val.key !== itemKey)
    setListArr(newArr)
  }

  useEffect(() => {
    stateRef.current = listArr
  })

  const topProps = {
    inputValue: inputValue,
    setInputValue: setInputValue,
    addList: addList
  }

  const listProps = {
    listArr: listArr,
    setListArr: setListArr,
  }

  const itemProps = {
    inputValue: inputValue,
    deleteItem: deleteItem,
    key: inputValue,
    checked: false,
  }

  return (
    <div>
      <Top state={topProps} />
      <TodoList state={listProps} />
    </div>
  )
}
const dom = document.getElementById("root");
if (dom !== null) {
  const root = ReactDOM.createRoot(dom);
  root.render(<Main />);
}




