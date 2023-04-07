// HTML form attribute
export interface FormAttribute {
  label: string;
  type: string;
  name: string;
  value?: any;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// HTML form
export interface Form {
  title: string;
  attribute: FormAttribute[];
  btnText: string;
  readonly onClick? : (e: React.MouseEvent<HTMLElement>) => void;
}
