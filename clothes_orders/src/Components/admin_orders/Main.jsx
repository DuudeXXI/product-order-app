import { useContext } from "react";
//
import DataContext from "../../Contexts/DataContext";
import AdminOrdersContext from "../../Contexts/AdminOrders";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
// Data
const Main = () => {
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [clothes, setClothes] = useState(null);
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const [list, setList] = useState(null);

  // READ for list
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3003/home/clothes", authConfig())
  //     .then((res) => {
  //       setClothes(res.data);
  //     });
  // }, [lastUpdate]);

  useEffect(() => {
    axios.get("http://localhost:3003/server/orders", authConfig())
    .then((res) => {
      setList(reList(res.data));
      console.log(reList(res.data));
      console.log(res.data);
    });
  }, [lastUpdate]);

  const reList = data => {
    const d = new Map();
    data.forEach(line => {
        if (d.has(line.name)) {
            d.set(line.name, [...d.get(line.name), line]);
        } else {
            d.set(line.name, [line]);
        }
    });
    return [...d];
}

  return (
    <AdminOrdersContext.Provider
      value={{
        clothes,
        list,
        setClothes,
        setList,
        setOrders,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <List />
          </div>
        </div>
      </div>
    </AdminOrdersContext.Provider>
  );
};

export default Main;
