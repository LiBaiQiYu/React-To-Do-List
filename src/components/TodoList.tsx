import React, { useState } from "react";
import ListItem from "./ListItem";
import { RadioGroup, FormControlLabel, Radio, FormGroup } from '@mui/material';

export default function TodoList(props: { state: { listArr: Item[]; setListArr: React.Dispatch<React.SetStateAction<Item[]>>; setOpen: React.Dispatch<React.SetStateAction<boolean>>; setMsg: React.Dispatch<React.SetStateAction<string>>; }; }) {
  const [value, setValue] = useState("1");
  const { listArr, setListArr, setOpen, setMsg } = props.state;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(listArr)
    let del = false
    listArr.forEach(item => {
      item.timer.current?.forEach(i => {
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
  }).map((i, index) => <ListItem state={i} key={i.key} index={index} checkChange={() => checkChange(i.key)} />)
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange} value={value}
        style={{marginBottom:'20px'}}
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
