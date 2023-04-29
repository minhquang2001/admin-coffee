import React, { useState } from 'react';
import './FormCreate.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function FormCreate() {



  const initialValues = { name: "", price: "", sale: "", category: "", image: "", quantity: "", description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate()
  // const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      setSizes(sizes.filter((size) => size !== value));
    }
  };



  // add input 
  const [inputValues, setInputValues] = useState([]);

  const handleAddInput = (e) => {
    e.preventDefault()
    const allValuesFilled = inputValues.every(value => value !== '')
    if (allValuesFilled) {
      setInputValues([...inputValues, '']);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    const values = inputValues.filter(value => value !== '');
    console.log(values)

  };
  console.log(inputValues)
  const formCurrent = {
    size: sizes,
    topping: inputValues,
    ...formValues
  }
  console.log(formCurrent)
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post('https://api-coffee-e8kl.onrender.com/api/product/add', formCurrent)
      setFormValues(initialValues)
      navigate('/products')
    }
    catch (err) {
      console.log(err)
    }
  }

  console.log(sizes)
  return (
    <>
      <form className="contact-us">
        <div className="title">
          <h1>Add Product</h1>
        </div>
        <div className="form">
          <div className="form-items">
            <div className='heading'>Name:</div>
            <input
              type="text"
              className="input"
              spellCheck="false"
              placeholder="Name"
              name="name"
              required
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-items">
            <div className='heading'>Price:</div>
            <input
              type="number"
              className="input"
              spellCheck="false"
              placeholder="Price"
              name="price"
              required
              value={formValues.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-items">
            <div className='heading'>Link Image:</div>
            <input
              type="text"
              className="input"
              spellCheck="false"
              placeholder="Image"
              name="image"
              required
              value={formValues.image}
              onChange={handleChange}
            />
          </div>
          <div className="form-items">
            <div className='heading'>Quantity:</div>
            <input
              type="text"
              className="input"
              spellCheck="false"
              placeholder="Quantity"
              name="quantity"
              required
              value={formValues.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-items">
            <div className='heading'>Sale:</div>
            <input
              type="number"
              className="input"
              spellCheck="false"
              placeholder="Sale"
              name="sale"
              value={formValues.sale}
              onChange={handleChange}
            />
          </div>
          <div className="form-items">
            <div className='heading'>Category:</div>
            <input
              type="text"
              className="input"
              spellCheck="false"
              placeholder="Category"
              name="category"
              required
              value={formValues.category}
              onChange={handleChange}
            />
          </div>
          <div className='form-items'>
            <div className='heading'>Size:</div>
            <div className='wrap__option-sizes'>
              <label>
                <input
                  className='checkbox'
                  type="checkbox"
                  name="Size"
                  value="S"
                  onChange={handleSizeChange}
                />
                Size S
              </label>
              <label>
                <input
                  className='checkbox'
                  type="checkbox"
                  name="Size"
                  value="M"
                  onChange={handleSizeChange}
                />
                Size M
              </label>
              <label>
                <input
                  className='checkbox'
                  type="checkbox"
                  name="Size"
                  value="L"
                  onChange={handleSizeChange}
                />
                Size L
              </label>
            </div>
          </div>
          <div className='form-items'>
            <div className='heading'>Topping:</div>
            <div className='wrap__input'>
              {inputValues.map((value, index) => (
                <input
                  className='input'
                  key={index}
                  type="text"
                  value={value}
                  onChange={(event) => handleInputChange(index, event.target.value)}
                  required={index > 0}
                />
              ))}
              <button className='btn__addinput' onClick={handleAddInput} disabled={inputValues.some(value => value === '')}>
                Add More Topping
              </button>
            </div>
          </div>
          <div className="form-items">
            <textarea
              className="input message"
              spellCheck="false"
              cols="30"
              rows="10"
              placeholder="Description....."
              name="description"
              required
              value={formValues.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button className="btn" type="submit" value="Send" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default FormCreate;
