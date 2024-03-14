interface Item {
  inputValue: string,
  deleteItem: (itemKey: string, set: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<boolean>) => void,
  timer: React.MutableRefObject<NodeJS.Timeout[] | undefined[]>,
  key: string,
  checked: boolean,
}