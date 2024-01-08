import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Input, Radio, Checkbox } from 'antd';

function Top(props) {
  const { inputValue, setInputValue, addList } = props.state;
  return (
    <div>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="请输入事项" style={{ width: 400 }} />
      <Button type="primary" onClick={addList}>添加待办</Button>
      <br></br>
    </div>
  )
}

function TodoList(props) {
  const [value, setValue] = useState(1);
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
    if (value === 1) {
      return item
    } else if (value === 2) {
      return item.checked
    } else {
      return !item.checked
    }
  }).map(i => <Item state={i} key={i.key} checkChange={(e) => checkChange(i.key, e)} />)
  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>全部</Radio>
        <Radio value={2}>已完成</Radio>
        <Radio value={3}>未完成</Radio>
      </Radio.Group>
      <ul>
        {newItem}
      </ul>
    </div>
  )
}

function Item(props) {
  const { checked, inputValue, deleteItem } = props.state;
  const { checkChange } = props;
  return (<li style={{ width: '300px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <Checkbox onClick={checkChange} checked={checked}></Checkbox>
    <div style={{ flex: '1', padding: '0 10px' }}>{inputValue}</div>
    <Button onClick={() => deleteItem(inputValue)} type="dashed" danger >
      删除
    </Button>
  </li>)
}

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [listArr, setListArr] = useState([]);
  const stateRef = useRef(null);

  const addList = (e) => {
    if (inputValue === '') return;
    setListArr([...listArr, itemProps])
    setInputValue('')
  }

  const deleteItem = (itemKey) => {
    const newArr = stateRef.value.filter((val) => val.key !== itemKey)
    setListArr(newArr)
  }

  useEffect(() => {
    stateRef.value = listArr
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);


