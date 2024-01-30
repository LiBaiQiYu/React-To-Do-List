import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/index.css';
import { TextField, Button, Checkbox, RadioGroup, FormControlLabel, Radio, FormGroup, Snackbar } from '@mui/material';

interface Item {
  inputValue: string,
  deleteItem: (itemKey: string, set: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<boolean>) => void,
  timer: React.MutableRefObject<NodeJS.Timeout[] | undefined[]>,
  key: string,
  checked: boolean,
}

function Top(props: { state: { inputValue: string; setInputValue: React.Dispatch<React.SetStateAction<string>>; addList: () => void; }; }) {
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

function TodoList(props: { state: { listArr: Item[]; setListArr: React.Dispatch<React.SetStateAction<Item[]>>; setOpen: React.Dispatch<React.SetStateAction<boolean>>; setMsg: React.Dispatch<React.SetStateAction<string>>; }; }) {
  const [value, setValue] = useState("1");
  const { listArr, setListArr, setOpen, setMsg } = props.state;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(listArr)
    let del = false
    listArr.forEach(item => {
      item.timer.current?.forEach(i=>{
        if (i) {
          del = true
          setMsg("Please do the action after deleting it!")
          setOpen(true)
        }
      })
      
    })
    if (!del) {
      setValue(e.target.value);
    }

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
  }).map((i,index) => <ListItem state={i} key={i.key} index={index} checkChange={() => checkChange(i.key)} />)
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


function ListItem(props: { state: Item; checkChange: (key: string) => void; index:number }) {
  const { checked, inputValue, deleteItem, key, timer } = props.state;
  const { checkChange,index } = props;
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(false);
  const progressRef = useRef(false);
  const undo = () => {
    console.log(props,timer,index)
    setProgress(false);
    progressRef.current = false;
    clearTimeout(timer.current[index])
    timer.current[index] = undefined
  }
  return (<div style={{ position: 'relative', width: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: 'solid 1px #EEEEEE' }} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
    <FormControlLabel style={{ width: '100%' }} control={<Checkbox onClick={() => checkChange(key)} checked={checked} />} label={inputValue} />
    <Button style={{ flexShrink: 0, width: '100px', height: '50px', transition: '.2s', opacity: show ? '1' : '0', display: !progress ? 'block' : 'none' }} variant="contained" color="error" onClick={() => deleteItem(key, setProgress, progressRef)} >DEL ITEM</Button>
    <Button style={{ flexShrink: 0, width: '100px', height: '50px', transition: '.2s', opacity: show ? '1' : '0', display: progress ? 'block' : 'none' }} variant="contained" color="secondary" onClick={() => undo()} >UNDO</Button>
    <div className={progress ? 'line' : ''} style={{ position: 'absolute', width: '100%', height: '2px', background: '#DC004E', transformOrigin: '0', opacity: progress ? '1' : '0' }}></div>
  </div >)
}

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const timer = useRef<NodeJS.Timeout[]>([]);
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
        setMsg("Already had same item.")
        setOpen(true)
      }
    }
  }

  const deleteItem = (itemKey: string, set: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<boolean>) => {
    set(true);
    console.log(list)
    ref.current = true;
    list.current.forEach((item, index) => {
      if (item.key === itemKey) {
        timer.current[index] = setTimeout(() => {
          setListArr(list.current.filter((val) => val.key !== itemKey))
        }, 3000)
      }
    })
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
    setOpen: setOpen,
    setMsg: setMsg
  }

  const itemProps = {
    inputValue: inputValue,
    deleteItem: deleteItem,
    timer: timer,
    key: inputValue,
    checked: false,
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div style={{ width: '800px', minHeight: '800px', margin: '20px auto', border: 'solid 1px #EEEEEE', borderRadius: '10px', boxSizing: 'border-box', padding: '20px', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' }}>
      <Top state={topProps} />
      <TodoList state={listProps} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msg}
      />
    </div>
  )
}
const dom = document.getElementById("root");
if (dom !== null) {
  const root = ReactDOM.createRoot(dom);
  root.render(<Main />);
}