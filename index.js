const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector("#input-file")

// Add the .dragged class on the dropzone container if it does not exist.
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault()
  if(!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged")
  }
})

// Remove the dragged class once we leave the drop zone
dropZone.addEventListener("dragleave" , (event)=> {
  event.preventDefault()
  dropZone.classList.remove("dragged")
})
// Remove the dragged class once we drop the item in the drop zone
dropZone.addEventListener("drop" , (event)=> {
  event.preventDefault()
  dropZone.classList.remove("dragged")
})