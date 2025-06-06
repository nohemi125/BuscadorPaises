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
        <p><strong>Continente:</strong> ${info.region}</p>

      `;
  
      document.querySelector('.bandera img').src = info.flags.svg;
  
      // Obtener datos del clima
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
  
        // CAMBIAR EL COLOR DE FONDO SEGÚN EL CLIMA
        const estadoClima = climaData.weather[0].main.toLowerCase();
        const seccion = document.querySelector('section');
        seccion.style.background = ''; // Reset
  
        switch (estadoClima) {
          case 'clear':
            seccion.style.background = 'linear-gradient(to right, #f9d423, #ff4e50)'; break;
          case 'clouds':
            seccion.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)'; break;
          case 'rain':
          case 'drizzle':
            seccion.style.background = 'linear-gradient(to right, #4b79a1, #283e51)'; break;
          case 'thunderstorm':
            seccion.style.background = 'linear-gradient(to right, #141e30, #243b55)'; break;
          case 'snow':
            seccion.style.background = 'linear-gradient(to right, #e6dada,rgb(61, 82, 87))'; break;
          case 'mist':
          case 'fog':
            seccion.style.background = 'linear-gradient(to right, #757f9a, #d7dde8)'; break;
          default:
            seccion.style.background = 'linear-gradient(to right, #7a7a7a, #002029)'; break;
        }
      } else {
        throw new Error('No se pudo obtener el clima');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      alert('Revisa que el país ingresado esté correcto.');
    }
  });
  