import { Form } from "../types/Form";

const FormInput = ({ form }: { form: Form }) => {
  return (
    <div className="max-w-2xl mx-auto my-4 p-8 shadow border-b">
      <h1 className="font-bold text-3xl tracking-wider">{form.title}</h1>
      {form.attribute.map((atb) => (
        <div className="grid grid-cols-7 my-8">
          <label className="col-span-2 py-2">{atb.label}:</label>
          <input
            className="col-span-5 h-10 w-full border-solid border-2 border-black p-2"
            type={atb.type}
            name={atb.name}
            placeholder={atb.label}
          ></input>
        </div>
      ))}
      <button className="rounded text-white font-semibold bg-cyan-600 px-3 py-2">
        {form.btnText}
      </button>
    </div>
  );
};

export default FormInput;
