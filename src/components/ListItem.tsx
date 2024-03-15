import { useRef, useState } from "react";
import { Button, Checkbox, FormControlLabel } from '@mui/material';

export default function ListItem(props: { state: Item, index: number, item: itemProps }) {
  const { checked, inputValue, timer } = props.state;
  const { index } = props;
  const { list, listArr, setListArr } = props.item;
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(false);
  const progressRef = useRef(false);

  const checkChange = () => {
    let newArr = listArr.slice();
    newArr.forEach(item => {
      if (item.inputValue === inputValue) {
        item.checked = !item.checked
      }
    })
    setListArr(newArr);
  }

  const deleteItem = () => {
    setProgress(true);
    let newArr = listArr.slice()
    progressRef.current = true;
    newArr.forEach((item, index) => {
      if (item.inputValue === inputValue) {
        timer.current[index] = setTimeout(() => {
          timer.current[index] = undefined
          setListArr(list.current.filter((i) => i.inputValue !== inputValue))
        }, 3000)
      }
    })
  }

  const undo = () => {
    console.log(props, timer, index)
    setProgress(false);
    progressRef.current = false;
    clearTimeout(timer.current[index])
    timer.current[index] = undefined
  }

  return (<div style={{ position: 'relative', width: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: 'solid 1px #EEEEEE' }} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
    <FormControlLabel style={{ width: '100%' }} control={<Checkbox onClick={() => checkChange()} checked={checked} />} label={inputValue} />
    <Button style={{ flexShrink: 0, width: '100px', height: '50px', transition: '.2s', opacity: show ? '1' : '0', display: !progress ? 'block' : 'none' }} variant="contained" color="error" onClick={() => deleteItem()} >DEL ITEM</Button>
    <Button style={{ flexShrink: 0, width: '100px', height: '50px', transition: '.2s', opacity: show ? '1' : '0', display: progress ? 'block' : 'none' }} variant="contained" color="secondary" onClick={() => undo()} >UNDO</Button>
    <div className={progress ? 'line' : ''} style={{ position: 'absolute', width: '100%', height: '2px', background: '#DC004E', transformOrigin: '0', opacity: progress ? '1' : '0' }}></div>
  </div >)
}