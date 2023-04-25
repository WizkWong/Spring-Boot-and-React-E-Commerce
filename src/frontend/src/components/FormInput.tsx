import { FormAttribute } from "../types/UserInterfaces";

// form without validation
const FormInput = ({ form }: { form: FormAttribute[] }) => {
  return (
    <>
      {form.map((atb, index) => (
        <div key={index} className="grid grid-cols-7 my-8">
          <label className="col-span-2 py-2">{atb.label}:</label>
          <input
            className="col-span-5 h-10 w-full border-solid border-2 border-black p-2"
            type={atb.type}
            name={atb.name}
            value={atb.value}
            onChange={atb.onChange}
            placeholder={atb.label}
          ></input>
        </div>
      ))}
    </>
  );
};

export default FormInput;
