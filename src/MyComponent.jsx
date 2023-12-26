import React, { useEffect, useState } from 'react';
import { API_URL } from './config';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/some-endpoint`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>Ha ocurrido un error al cargar los datos.</p>
      ) : data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default MyComponent;
