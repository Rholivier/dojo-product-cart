import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 },
];

const ProductRow = ({product, onChangeList}) => {

  const [quantity, setQuantity] = useState(product.quantity)

  const changeValue = (value) => {
    onChangeList((prevList) => prevList.map(item => item.id === product.id ? {...product, quantity: value} : item))
  }

  const handleChangeQuantity = (e) => {
    const quantityValue = parseInt(e.target.value)
    if(quantityValue === 0) {
      const confirm = window.confirm("Etes-vous sûr de bien vouloir retirer ce produit de la list")
     return confirm && onChangeList((prevList) => prevList.filter(item => item.id !== product.id))
    }
    changeValue(quantityValue)
  }


  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price} €</td>
      <td><input type="number" min="0" value={product.quantity} onChange={(e) => handleChangeQuantity(e)} /></td>
      <td>{product.price * product.quantity} €</td>
    </tr>
  );
};

function App() {

  const [productList, setProductList] = useState([...initialProductList])
  const [newProductName, setNewProductName] = useState("")
  const [newProductPrice, setNewProductPrice] = useState(0)

  const handleAddProduct = (e) => {
    e.preventDefault()
    const newProduct = {
      id: uuidv4()/** ou productList.length + 1*/,
      name: newProductName,
      price: newProductPrice,
      quantity: 1
    }
    setProductList([...productList, newProduct]) 
  }

  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product => 
          <ProductRow key={product.id} product={product} onChangeList={setProductList}/> ) }
        </tbody>
      </table>
      <p>Montant de la commande: {productList.reduce((acc, current) => acc + current.price * current.quantity  ,0 )}€</p>
      
      <form onSubmit={(e) => handleAddProduct(e)}>
        <h2>Ajouter un produit</h2>
        <div className="field">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" id="name"  value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="price">Prix</label>
          <input type="number" name="price" id="price"  value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )};

export default App;
