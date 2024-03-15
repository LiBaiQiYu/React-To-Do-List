import { useEffect, useRef, useState } from 'react';

import Top from './Top';
import TodoList from './TodoList';

import { Snackbar } from '@mui/material';

export default function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState<Item[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const list = useRef<Item[]>([]);

  useEffect(() => {
    console.log(listArr)
    list.current = listArr
  }, [listArr])

  const topProps = {
    inputValue,
    setInputValue,
  }

  const listProps = {
    list
  }

  const commonProps = {
    listArr,
    setListArr,
    setOpen,
    setMsg
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ backgroundColor: '#FFF', width: '800px', minHeight: '800px', margin: '20px auto', border: 'solid 1px #EEEEEE', borderRadius: '10px', boxSizing: 'border-box', padding: '20px', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' }}>
      <Top state={{ ...topProps, ...commonProps }} />
      <TodoList state={{ ...listProps, ...commonProps }} />
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