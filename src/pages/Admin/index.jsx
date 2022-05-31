import React, { useState } from 'react'
import Api from '../../Api';

const AdminPage = () => {  
  const [name, setName] = useState('');
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceBig, setPriceBig] = useState(0);
  const [_id, set_id] = useState(0);
  const [image, setImage] = useState(null);
  
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
  const handlePriceBigChange = (e) => setPriceBig(e.target.value);
  const handle_idChange = (e) => set_id(e.target.value);
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file, setImage);
  }
  const handleSubmit = () => {
    const pizza = {_id, name, priceSmall, priceBig, image};    
    Api().post("pizzas", pizza)
        .then(function () {
          alert('Success!')
        })
        .catch((error) => console.log(error));
  }

  return (
    <div id="admin">
    <img src={image} alt="pizza"/>
      <label>
        _id: 
        <input type="text" name="_id" onChange={handle_idChange} />
      </label>
      <label>
        Име на пица:
        <input type="text" name="name" onChange={handleNameChange} />
      </label>
      <label>
        Цена мала:
        <input type="number" name="priceSmall" onChange={handlePriceSmallChange} />
      </label>
      <label>
        Цена голема:
        <input type="number" name="priceBig" onChange={handlePriceBigChange} />
      </label>
      <label>
        Слика: 
        <input type="file" name="file" onChange={uploadHandler}/>
      </label>

      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default AdminPage