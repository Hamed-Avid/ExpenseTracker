import { useState } from "react";
import TransActionForm from "./TransActionForm";

const OverView = ({ income, expense, onAdd, setIsShow, isShow }) => {
  return (
    <div className="overView">
      <div className="balance">
        <p>Balance : {income - expense}</p>
        <button
          onClick={() => setIsShow((prevState) => !prevState)}
          className={`btn ${isShow && "btn--cancel"}`}
        >
          {isShow ? "Cancel" : "Add"}
        </button>
      </div>
      {isShow && <TransActionForm onAdd={onAdd} setIsShow={setIsShow} />}
      <div className="result">
        <div className="expenseBox">
          Expense <span>{expense} $</span>
        </div>
        <div className="incomeBox">
          Income <span>{income} $</span>
        </div>
      </div>
    </div>
  );
};

export default OverView;
