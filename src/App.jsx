import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import itemsData from './data.json';

function App() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('');
  const [items, setItems] = useState([]);

  const handleItemChange = (e) => setItem(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleDiscountChange = (e) => setDiscount(e.target.value);  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && price && quantity) {

      // const existingItem = items.find(entry => entry.item === item && entry.price === itemPrice);

      // if (existingItem) {
      //   setWarning('This item with the same price already exists.');
      //   return; // Prevent adding the redundant item
      // }

      // const isUnique = !items.some(entry => entry.item === item && entry.price !== itemPrice);

      // if (!isUnique) {
      //   setWarning('This item is unique by name but has a different price.');
      // }



      setItems([...items, 
        { item, 
          price: parseFloat(price), 
          quantity: parseInt(quantity, 10), 
          discount: parseInt(discount),
          amount: (price * quantity) - discount }]);
      // setItem('');
      // setPrice('');
      // setQuantity('');
      // setDiscount('');
    }
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setItems([]);
  };
  
  const totalAmount = items.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDiscount = items.reduce((acc, curr) => acc + curr.discount, 0);

  
  
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className='p-3'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formItem">
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    as="select"
                    value={item}
                    onChange={handleItemChange}
                  >
                    <option value="">Select an item</option>
                    {itemsData.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price Per Unit</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter quantity"
                  />
                </Form.Group>

                <Form.Group controlId="formDiscount">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    value={discount}
                    onChange={handleDiscountChange}
                    placeholder="Enter Discount"
                  />
                </Form.Group>

                <hr></hr>

                <Button variant="primary" className='w-100' type="submit">
                  Add
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={8}>
            <Card className='p-3'>
              <Card.Body>
                <Card.Title>Quotation</Card.Title>
                <Button variant="primary" onClick={handleClearAll}>Clear</Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Quantity</th>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((entry, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </td>
                        <td>{entry.quantity}</td>
                        <td>{entry.item}</td>
                        <td>{entry.price.toFixed(2)}</td>
                        <td>{entry.discount}</td>
                        <td>{(entry.discount * entry.quantity).toFixed(2)}</td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={5} className='text-end'>Discount Total</td>
                      <td>{totalDiscount}</td>
                    </tr>

                    <tr>
                      <td colSpan={5} className='text-end'>Total</td>
                      <td>{totalAmount}</td>
                    </tr>

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>      
    </>
  )
}

export default App
