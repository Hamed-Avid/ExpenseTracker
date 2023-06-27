import { useEffect } from "react";
import { useState } from "react";
import OverView from "./OverView";
import TransActions from "./TransActions";

const ExpenseApp = () => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [transActions, setTransActions] = useState([]);

  useEffect(() => {
    let exp = 0;
    let inc = 0;
    transActions.forEach((trans) => {
      trans.type == "expense"
        ? (exp = exp + parseFloat(trans.amount))
        : (inc = inc + parseFloat(trans.amount));
    });
    setIncome(inc);
    setExpense(exp);
  }, [transActions]);

  const addTransAction = (formValues) => {
    setTransActions([...transActions, { ...formValues, id: Date.now() }]);
  };

  const deleteHandler = (id) => {
    setTransActions(transActions.filter((trans) => trans.id != id));
  };

  const updateHandler = (id, newValue) => {
    const index = transActions.findIndex((trans) => trans.id == id);
    const updatedTransaction = [...transActions];
    updatedTransaction[index] = newValue;
    setTransActions(updatedTransaction);
  };

  return (
    <section className="container">
      <OverView
        income={income}
        expense={expense}
        onAdd={addTransAction}
        setIsShow={setIsShow}
        isShow={isShow}
      />
      <TransActions
        transactions={transActions}
        onDelete={deleteHandler}
        onUpdate={updateHandler}
        isShow={isShow}
      />
    </section>
  );
};

export default ExpenseApp;
