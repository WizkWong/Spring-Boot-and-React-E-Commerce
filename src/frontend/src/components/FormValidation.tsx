import { FormAttribute } from "../types/UserInterfaces";

// generic form design, can be used anywhere but design remain same
const FormValidation = ({ form }: { form: FormAttribute[] }) => {
  return (
    <>
      {form.map((atb, index) => (
        <div key={index}>
          <div className="grid grid-cols-7 mt-5">
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
          <div className="grid grid-cols-7 mb-5">
            <div className="col-span-2"></div>
            <p className="col-span-5 text-red-500 text-sm">{atb.errorMsg}</p>
          </div>
        </div>
      ))}
    </>
  );
};


export default FormValidation