const URLparamiters = new URLSearchParams(location.search)
const gnomesId = URLparamiters.get("id")
const gnomesURL = "https://striveschool-api.herokuapp.com/api/product/"
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5YTM4MzRiZjAwMTUwMDA2ZjEiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.MCjLEIsOnQhKhOBwntExpjKRn-57M0BG-22BDq82Rw8"
const getGnomesDetails = function () {
  fetch(gnomesURL + gnomesId, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      console.log("response", response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel caricamento dei dettagli")
      }
    })
    .then((data) => {
      console.log("dettagli dello gnomo", data)
      const name = document.getElementById("name")
      const brand = document.getElementById("brand")
      const description = document.getElementById("description")
      const price = document.getElementById("price")
      const imageUrl = document.getElementById("imageUrl")

      name.innerText = data.name
      brand.innerText = data.brand
      description.innerText = data.description
      price.innerText = data.price
      imageUrl.innerText = data.imageUrl
    })
    .catch((error) => {
      console.log("Errore", error)
    })
}

const editGnomes = function () {
  location.assign("./admin.html?id=" + gnomesId)
}

const deleteGnomes = function () {
  fetch(gnomesURL + gnomesId, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Gnomo eliminato")
        location.assign("./index.html")
      } else {
        throw new Error("Qualcosa non va")
      }
    })
    .catch((error) => {
      console.log("Errore", error)
    })
}

getGnomesDetails()
