import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Checkbox, RadioGroup, FormControlLabel, Radio, FormGroup, Snackbar } from '@mui/material';

interface Item {
  inputValue: string,
  deleteItem: (itemKey: string, set: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<boolean>) => void,
  key: string,
  checked: boolean,
}

function Top(props: { state: { inputValue: string; setInputValue: React.Dispatch<React.SetStateAction<string>>; addList: () => void; }; }) {
  const { inputValue, setInputValue, addList } = props.state;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField size='small' id="outlined-basic" label="Input Items" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="input item" variant="outlined" />
      <Button style={{ marginLeft: '20px' }} variant="contained" onClick={addList}>ADD ITEM</Button>
    </div>
  )
}

function TodoList(props: { state: { listArr: Item[]; setListArr: React.Dispatch<React.SetStateAction<Item[]>>; }; }) {
  const [value, setValue] = useState("1");
  const { listArr, setListArr } = props.state;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const checkChange = (key: string) => {
    console.log(key)
    let newArr = listArr.slice();
    newArr.forEach(item => {
      if (item.key === key) {
        item.checked = !item.checked
      }
    })
    setListArr(newArr);
  }

  let newItem = listArr.filter((item: Item) => {
    if (value === "1") {
      return item
    } else if (value === "2") {
      return item.checked
    } else {
      return !item.checked
    }
  }).map(i => <ListItem state={i} key={i.key} checkChange={() => checkChange(i.key)} />)
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange} value={value}
      >
        <FormControlLabel value={"1"} control={<Radio />} label="ALL" />
        <FormControlLabel value={"2"} control={<Radio />} label="DONE" />
        <FormControlLabel value={"3"} control={<Radio />} label="DOING" />
      </RadioGroup>
      <FormGroup>
        {newItem}
      </FormGroup>
    </div>
  )
}


function ListItem(props: { state: Item; checkChange: (key: string) => void; }) {
  const { checked, inputValue, deleteItem, key } = props.state;
  const { checkChange } = props;
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(false);
  const progressRef = useRef(false);
  const undo = () => {
    setProgress(false);
    progressRef.current = false;
  }
  return (<div style={{ position: 'relative', width: '240px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
    <FormControlLabel style={{ width: 'calc(100% - 220px)' }} control={<Checkbox onClick={() => checkChange(key)} checked={checked} />} label={inputValue} />
    <Button style={{ width: '100px', transition: '.2s', opacity: show ? '1' : '0', display: !progress ? 'block' : 'none' }} variant="contained" color="error" onClick={() => deleteItem(key, setProgress, progressRef)} >DEL ITEM</Button>
    <Button style={{ width: '100px', transition: '.2s', opacity: show ? '1' : '0', display: progress ? 'block' : 'none' }} variant="contained" color="secondary" onClick={() => undo()} >UNDO</Button>
    <div className='line' style={{ position: 'absolute', width: '100%', height: '2px', background: 'blue', transformOrigin: '0', opacity: progress ? '1' : '0' }}></div>
  </div >)
}

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const list = useRef<Item[]>([]);

  const addList = () => {
    if (inputValue === '') return;
    if (listArr.length === 0) {
      setListArr([...listArr, itemProps])
      setInputValue('')
    } else {
      let has = false;
      listArr.forEach(item => {
        if (item.inputValue === inputValue) {
          has = true
        }
      })
      if (!has) {
        setListArr([...listArr, itemProps])
        setInputValue('')
      } else {
        setOpen(true)
      }
    }
  }

  const deleteItem = (itemKey: string, set: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<boolean>) => {
    set(true);
    ref.current = true;
    // setListArr(list.current.filter((val) => val.key !== itemKey))
  }

  useEffect(() => {
    list.current = listArr //使用useEffect和Ref同步获取list数据
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
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Top state={topProps} />
      <TodoList state={listProps} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Already had same item."
      />
    </div>
  )
}
const dom = document.getElementById("root");
if (dom !== null) {
  const root = ReactDOM.createRoot(dom);
  root.render(<Main />);
}