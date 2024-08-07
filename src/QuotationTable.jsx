import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";
import { useState, useEffect } from "react";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const totalAmount = data.reduce(
      (acc, v) => acc + (v.qty * v.ppu - v.discount),
      0,
    );
    const totalDiscountValue = data.reduce((acc, v) => acc + v.discount, 0);

    setTotal(totalAmount);
    setTotalDiscount(totalDiscountValue);
  }, [data]);

  const clearTable = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p>
          <CiShoppingCart /> No items
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
            <th className={style.textCenter}>Discount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            let amount = v.qty * v.ppu - v.discount;
            return (
              <tr key={i}>
                <td className={style.textCenter}>
                  <BsFillTrashFill onClick={() => handleDelete(i)} />
                </td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textRight}>{amount}</td>
                <td className={style.textRight}>{v.discount}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>{total}</td>
          </tr>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total Discount
            </td>
            <td className={style.textRight}>{totalDiscount}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
