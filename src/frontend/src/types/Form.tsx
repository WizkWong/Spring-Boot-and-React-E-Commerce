export interface FormAttribute {
  label: string;
  type: string;
  name: string;
}

export interface Form {
  title: string;
  attribute: FormAttribute[];
  btnText: string;
}
