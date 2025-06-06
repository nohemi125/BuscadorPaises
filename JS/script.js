document.querySelector('button').addEventListener('click', async () => {
    const pais = document.querySelector('input').value;
    const apiKey = '5f2f93f345c76472935758be249804f4';
  
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
      const data = await res.json();
      const info = data[0];
  
      const capital = encodeURIComponent(info.capital[0]);
  
      document.querySelector('.informacion').innerHTML = `
        <p><strong>Nombre del país:</strong> ${info.name.common}</p>
        <p><strong>Capital:</strong> ${info.capital[0]}</p>
        <p><strong>Población:</strong> ${info.population.toLocaleString()}</p>
        <p><strong>Idioma:</strong> ${Object.values(info.languages).join(', ')}</p>
        <p><strong>Moneda:</strong> ${Object.values(info.currencies)[0].name}</p>
        <p><strong>Código del país:</strong> ${info.cca2}</p>
      `;
  
      document.querySelector('.bandera img').src = info.flags.svg;
  
      const climaRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric&lang=es`
      );
      const climaData = await climaRes.json();
  
      if (climaData.cod === 200) {
        document.querySelector('.clima').innerHTML = `
          <p><strong>Clima:</strong> ${climaData.weather[0].description}</p>
          <p><strong>Temperatura:</strong> ${climaData.main.temp} °C</p>
          <p><strong>Humedad:</strong> ${climaData.main.humidity}%</p>
          <p><strong>Viento:</strong> ${climaData.wind.speed} m/s</p>
          <p><strong>Presión:</strong> ${climaData.main.pressure} hPa</p>
          <p><strong>Visibilidad:</strong> ${climaData.visibility / 1000} km</p>
          <p><strong>Nubosidad:</strong> ${climaData.clouds.all}%</p>
        `;
      } else {
        throw new Error('No se pudo obtener el clima');
      }
  
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      alert('Revisa que el pais ingresado este correcto.');
    }
  });
  