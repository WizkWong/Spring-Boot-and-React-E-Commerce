// form attribute
export interface FormAttribute {
  label: string;
  type: string;
  name: string;
  value?: any;
  errorMsg?: string;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
