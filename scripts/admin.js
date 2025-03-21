console.log("ciao")
class Gnomes {
  constructor(_name, _brand, _description, _price, _imageUrl) {
    this.name = _name
    this.brand = _brand
    this.description = _description
    this.price = _price
    this.imageUrl = _imageUrl
  }
}

const URLparameters = new URLSearchParams(location.search)
const gnomesId = URLparameters.get("id")

const nameInput = document.getElementById("name")
const brandInput = document.getElementById("brand")
const descriptionInput = document.getElementById("description")
const priceInput = document.getElementById("price")
const imageUrlInput = document.getElementById("imageUrl")

const gnomesURL = "https://striveschool-api.herokuapp.com/api/product/"
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5YTM4MzRiZjAwMTUwMDA2ZjEiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.MCjLEIsOnQhKhOBwntExpjKRn-57M0BG-22BDq82Rw8"

if (gnomesId) {
  fetch(gnomesURL + gnomesId, { headers: { Authorization: authorization } })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore nella fetch")
      }
    })
    .then((data) => {
      nameInput.value = data.name
      brandInput.value = data.brand
      descriptionInput.value = data.description
      priceInput.value = data.price
      imageUrlInput.value = data.imageUrl
    })
    .catch((err) => console.log("Il form non va", err))
}

const form = document.getElementById("gnomes-form")
form.addEventListener("submit", function (e) {
  e.preventDefault()

  const gnomes = new Gnomes(
    nameInput.value,
    brandInput.value,
    descriptionInput.value,
    priceInput.value,
    imageUrlInput.value
  )

  console.log("gnomes", gnomes)

  let methodToUse
  let URLtoUse

  if (gnomesId) {
    methodToUse = "PUT"
    URLtoUse = gnomesURL + gnomesId
  } else {
    methodToUse = "POST"
    URLtoUse = gnomesURL
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(gnomes),
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Gnomo salvato!")
        form.reset()
      } else {
        throw new Error("ricevuta response non ok dal backend")
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err)
    })
})
