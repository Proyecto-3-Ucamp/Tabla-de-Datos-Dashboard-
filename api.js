const apiCard = async () => {
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
                } 
            );
        }
    } catch (error) {
    console.log(error);
    }
};
