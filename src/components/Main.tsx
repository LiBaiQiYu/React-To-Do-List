import React, { useEffect, useRef, useState } from 'react';

import Top from './Top';
import TodoList from './TodoList';

import { Snackbar } from '@mui/material';

export default function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const timer = useRef<number[]>([]);
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
  },[listArr])

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
    <div style={{ backgroundColor:'#FFF',width: '800px', minHeight: '800px', margin: '20px auto', border: 'solid 1px #EEEEEE', borderRadius: '10px', boxSizing: 'border-box', padding: '20px', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' }}>
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