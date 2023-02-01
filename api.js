
// LLAMADA A LA API PARA DATOS DEL CANVA
// chart solo puede crear un grafico por id sino da error por eso
// tiene el id dinamico
const apiCanva = async (id) => {
    let response = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
    );
    let data = await response.json();
    const seleccionar = data.data

    // creamos este for para recorrer cada 7 elementos 
    // para quitar la carga a la web ya que vienen demasiados datos
    const datos = []
    for (let i = 0; i < seleccionar.length; i++) {
      if (i % 7 == 0) {
          datos.push(seleccionar[i]);
      }
  }

    try {
      if (data) {
        Chart.defaults.color = "white";
        new Chart(document.getElementById(`${id}`), {
          type: "line",
          data: {
            labels: datos.map((row) => row.date.slice(0, 10)),
            datasets: [
              {
                label: `Precio ${id}`,
                data: datos.map((row) => row.priceUsd),
                pointRadius: 2,
                pointBackgroundColor: "yellow",
                borderColor: "rgb(75, 192, 192)",
              },
            ],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  //LLAMADA A LA API PARA DATOS DEL CARD
  
  export const apiCard = async () => {
    let response = await fetch("https://api.coincap.io/v2/assets");
    let data = await response.json();
    try {
      if (data) {
      //  desestructuramos el objeto
        data.data.forEach(
          ({ symbol, name, rank, priceUsd, supply, changePercent24Hr,id }) => {
            
            // creamos un div por cada elemento devuelto de la api añado el canvas
            const nuevoDiv = document.createElement('div')
            nuevoDiv.innerHTML = `
            <div class='card'>
            <h6><span>Simbolo:</span> ${symbol}</h6>
            <h6><span>Nombre:</span> ${name}</h6>
            <h6><span>Rango:</span> ${rank}</h6>
            <h6><span>Precio:</span> ${priceUsd.slice(0,8)}</h6>
            <h6><span>Supply:</span> ${supply.slice(0,14)}</h6>
            <h6><span>Cambio 24h:</span> ${changePercent24Hr.slice(0,5)}</h6>
            <canvas class="canvas" id=${id} width="200px" height="200px"></canvas>
            </div>
            `;
            // siempre tenemos hay que decirle quien es el padre en 
            // este caso de info para decirle que me lo inserte despues de este...
            const info = document.getElementById("info");
            info.parentNode.insertBefore(nuevoDiv, info)
            apiCanva(id)
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };