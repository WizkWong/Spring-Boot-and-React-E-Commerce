// form attribute
export interface FormAttribute {
  label: string;
  type: string;
  name: string;
  value?: any;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
