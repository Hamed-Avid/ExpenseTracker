import { useState } from "react";

const TransActionForm = ({ onAdd, setIsShow, itemUpdate, onUpdate }) => {
  const [formValues, setFormValues] = useState(
    !itemUpdate
      ? {
          type: "expense",
          amount: "",
          desc: "",
        }
      : { ...itemUpdate }
  );

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formValues.amount > 0 && formValues.desc != "") {
      {
        if (!itemUpdate) {
          setIsShow(false);
          return onAdd(formValues);
        }
        return onUpdate(itemUpdate.id, formValues);
      }
    } else alert("inValid TransAction !!!");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="desc"
        placeholder="description"
        onChange={changeHandler}
        value={formValues.desc}
      />
      <input
        type="number"
        name="amount"
        placeholder="amount"
        onChange={changeHandler}
        value={formValues.amount}
      />
      <div className="radioBox">
        <input
          type="radio"
          value="expense"
          name="type"
          checked={formValues.type == "expense"}
          onChange={changeHandler}
          id="expense"
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          value="income"
          name="type"
          checked={formValues.type == "income"}
          onChange={changeHandler}
          id="income"
        />
        <label htmlFor="income">Income</label>
      </div>
      <button className="btn btn--primary" type="submit">
        {itemUpdate ? "Update transaction" : "Add transaction"}
      </button>
    </form>
  );
};

export default TransActionForm;
