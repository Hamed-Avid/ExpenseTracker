import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import TransActionForm from "./TransActionForm";

const TransActions = ({ transactions, onDelete, onUpdate, isShow }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredTrans, setFilteredTrans] = useState([]);
  const [itemUpdate, setItemUpdate] = useState({
    id: 0,
    type: "expense",
    amount: 0,
    desc: "",
  });

  useEffect(() => {
    setFilteredTrans(transactions);
    setItemUpdate({ id: 0, type: "", amount: 0, desc: "" });
  }, [transactions]);

  const filteredTransActions = (search) => {
    if (!search || search == "") {
      setFilteredTrans(transactions);
      return;
    }
    setFilteredTrans(
      transactions.filter((trans) =>
        trans.desc.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const searchHandler = (e) => {
    setSearchItem(e.target.value);
    filteredTransActions(e.target.value);
  };

  if (!transactions.length)
    return (
      <span className="transaction transaction--expense">
        add some transaction
      </span>
    );

  return (
    <section>
      <input
        type="text"
        value={searchItem}
        onChange={searchHandler}
        className="search"
        placeholder="search ..."
      />
      {filteredTrans.length ? (
        filteredTrans.map((trans) => (
          <div
            key={trans.id}
            className={`transaction ${
              trans.type == "expense" && "transaction--expense"
            }`}
          >
            {itemUpdate.id == trans.id && !isShow ? (
              <TransActionForm itemUpdate={itemUpdate} onUpdate={onUpdate} />
            ) : (
              <>
                <span>{trans.desc}</span>
                <span>$ {trans.amount}</span>
                <div>
                  <button onClick={() => onDelete(trans.id)} className="btn">
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => {
                      setItemUpdate(trans);
                    }}
                    className="btn"
                  >
                    <FaPencilAlt />
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <span className="transaction transaction--expense">item not found</span>
      )}
    </section>
  );
};

export default TransActions;
