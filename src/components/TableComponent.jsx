import { useState, useMemo } from "react";
import data from "../data/tableData.json";
import "../styles/TableComponent.css";

function TableComponent() {
  const [tableData, setTableData] = useState(data);
  const [inputValue, setInput] = useState(0);
  const [isUpdated, setUpdate] = useState(false);

  //   calculateVariance = (val) =>{

  //   }

  const addValue = (evt) => {
    setInput(evt.target.value);
  };

  const addAmount = (evt) => {
    let filterVal = evt.target.id;

    const filteredData = tableData.rows.filter((element) =>
      element.children.some((subElement) => subElement.label === filterVal)
    );

    const check = filteredData[0].children.filter(
      (obj) => obj.label === filterVal
    );
    check[0].value = check[0].value + JSON.parse(inputValue);

    const totalSum = filteredData[0].children.reduce(
      (sum, item) => sum + item.value,
      0
    );
    filteredData[0].value = totalSum;
    setInput(0);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    // setUpdate(true);
    // memoizedValue;
  };

  const addPercentage = (evt) => {
    let filterVal = evt.target.id;

    const filteredData = tableData.rows.filter((element) =>
      element.children.some((subElement) => subElement.label === filterVal)
    );

    const check = filteredData[0].children.filter(
      (obj) => obj.label === filterVal
    );
    check[0].value =
      check[0].value + JSON.parse((inputValue / 100) * check[0].value);

    const totalSum = filteredData[0].children.reduce(
      (sum, item) => sum + item.value,
      0
    );
    filteredData[0].value = totalSum;
    setInput(0);

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  };

  const memoizedValue = useMemo(() => {
    console.log("working");
  }, [isUpdated]);

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <td>Label</td>
            <td>Value</td>
            <td>Input</td>
            <td>Allocation %</td>
            <td>Allocation Val</td>
            <td>Variance %</td>
          </tr>
        </thead>

        {tableData.rows.map((obj, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td key={obj.id}>{obj.label}</td>
                <td key={obj.value}>{obj.value}</td>
                <td> </td>
                <td>
                  <button>Add %</button>
                </td>
                <td>
                  <button>Add Value</button>
                </td>
                <td>0%</td>
              </tr>
              {obj.children.map((child, i) => {
                return (
                  <tr key={i}>
                    <td key={child.label}>{child.label}</td>
                    <td key={child.value}>{child.value}</td>
                    <td>
                      <input id={child.label} onChange={addValue} />
                    </td>
                    <td>
                      <button id={child.label} onClick={addPercentage}>
                        Add %
                      </button>
                    </td>
                    <td>
                      <button id={child.label} onClick={addAmount}>
                        Add Value
                      </button>
                    </td>
                    <td>0%</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default TableComponent;
