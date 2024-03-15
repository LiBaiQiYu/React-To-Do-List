interface Item {
  inputValue: string;
  timer: React.MutableRefObject<number[] | undefined[]>;
  checked: boolean;
}
interface topProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  listArr: Item[];
  setListArr: React.Dispatch<React.SetStateAction<Item[]>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface listProps {
  list: React.MutableRefObject<Item[]>;
  listArr: Item[];
  setListArr: React.Dispatch<React.SetStateAction<Item[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}
interface itemProps {
  list: React.MutableRefObject<Item[]>;
  listArr: Item[];
  setListArr: React.Dispatch<React.SetStateAction<Item[]>>;
}