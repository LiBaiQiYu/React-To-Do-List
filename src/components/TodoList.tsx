import React, { useState } from "react";
import ListItem from "./ListItem";
import { RadioGroup, FormControlLabel, Radio, FormGroup } from '@mui/material';

export default function TodoList(props: { state: listProps }) {
  const [value, setValue] = useState("1");
  const { list, listArr, setListArr, setOpen, setMsg } = props.state;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let del = false
    listArr.forEach(item => {
      item.timer.current?.forEach(i => {
        if (i) {
          del = true
          setMsg("Please do the action after deletion!")
          setOpen(true)
        }
      })
    })
    if (!del) {
      setValue(e.target.value);
    }
  };

  const itemProps: itemProps = {
    list,
    listArr,
    setListArr
  }

  let newItem = listArr.filter((item) => {
    if (value === "1") {
      return item
    } else if (value === "2") {
      return item.checked
    } else {
      return !item.checked
    }
  }).map((i, index) => <ListItem state={i} key={i.inputValue} index={index} item={itemProps} />)

  
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange} value={value}
        style={{ marginBottom: '20px' }}
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
