const printDateInFooter = function () {
  const footerSpan = document.getElementById("year")
  footerSpan.innerText = new Date().getFullYear()
}
printDateInFooter()
