interface ICOption {
  id: string;
  value: string | number;
  label: string | number;
}

export interface IDropdownProps {
  value: string | number;
  handleChangeDropdown: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  options: ICOption[];
  name: string;
  label?: string;
}
