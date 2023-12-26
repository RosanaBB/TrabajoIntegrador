import React, { useState, useEffect } from 'react';

const CategoryCreationEdit = ({ match }) => {
  const categoryId = match.params.categoryId;
  const isEditing = !!categoryId;

  const [category, setCategory] = useState({
    name: '',
  });

  useEffect(() => {
    if (isEditing) {
      fetch(`https://fakeapi.platzi.com/categories/${categoryId}`)
        .then((response) => response.json())
        .then((data) => setCategory(data));
    }
  }, [isEditing, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      fetch(`https://fakeapi.platzi.com/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      })
        .then((response) => response.json())
        .then((data) => console.log('Category updated:', data));
    } else {
      fetch('https://fakeapi.platzi.com/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      })
        .then((response) => response.json())
        .then((data) => console.log('Category created:', data));
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Category' : 'Create Category'}</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={category.name}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>
        {isEditing ? 'Update Category' : 'Create Category'}
      </button>
    </div>
  );
};

export default CategoryCreationEdit;
