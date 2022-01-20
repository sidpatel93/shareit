const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector("#input-file")
const browseBtn = document.querySelector(".browse-button")

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

  // get the files coming fom the drop and send it to the input field
  const files = e.dataTransfer.files
  if(files.length) {
    fileInput.files = files
  }
})

// invoke the input file field when the browse link is clicked
browseBtn.addEventListener("click", (e) => {
  e.preventDefault()
  fileInput.click()
})

const uploadFiles = () => {
  const files = fileInput.files(0)
  const formData = new FormData()
  formData.append(files)
  const xhr = new XMLHttpRequest();

}