const hideSpinner = function () {
  const div = document.getElementById("spinner-container")
  div.classList.add("d-none")
}

const getGnomes = function () {
  const gnomesURL = "https://striveschool-api.herokuapp.com/api/product/"
  const authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5YTM4MzRiZjAwMTUwMDA2ZjEiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.MCjLEIsOnQhKhOBwntExpjKRn-57M0BG-22BDq82Rw8"
  fetch(gnomesURL, {
    headers: { Authorization: authorization },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("la risposta non era valida")
      }
    })
    .then((data) => {
      hideSpinner()
      console.log("DATI RICEVUTI DAL SERVER", data)

      const row = document.getElementById("gnomes-row")

      data.forEach((gnomes) => {
        row.innerHTML =
          row.innerHTML +
          `
          <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
            <div class="card">
              <img src="${gnomes.imageUrl}" class="card-img-top" alt="..." />
              <div class="card-body color">
                <h5 class="card-title text-white text-center">${gnomes.name}</h5>                
                <div class="text-center">
                <p class="card-title text-white">${gnomes.brand}</p>
                <p class="card-text text-white">${gnomes.description}</p>
                <p class="card-text text-white">${gnomes.price}€</p>
                <a href="./details.html?id=${gnomes._id}" class="btn color text-white border-white">Vai ai dettagli</a>
                </div>
              </div>
            </div>
          </div>
        `
      })
    })
    .catch((error) => {
      hideSpinner()
      console.log("si è verificato un errore", error)
    })
}

getGnomes()
