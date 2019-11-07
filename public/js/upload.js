const dropArea = document.getElementById('drop-area')
const button = document.getElementById('button')

dropArea.addEventListener('dragenter', preventDefaults, false)
dropArea.addEventListener('dragover', preventDefaults, false)
dropArea.addEventListener('dragleave', preventDefaults, false)
dropArea.addEventListener('drop', preventDefaults, false)

dropArea.addEventListener('dragenter', highlight, false)
dropArea.addEventListener('dragover', highlight, false)
dropArea.addEventListener('dragleave', unhighlight, false)
dropArea.addEventListener('drop', unhighlight, false)

dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
    button.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
    button.classList.remove('highlight')
}


function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}

function uploadFile(file) {
    let url = '/cloud/media/uploader'
    let formData = new FormData()

    formData.append('file', file)

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(() => {
            /* 성공했을떄 */
            let result = document.getElementById('result')
            result.innerHTML = 'Success!'
            result.style.color = 'blue'
        })
        .catch(() => {
            /* 에러났을때 */
            let result = document.getElementById('result')
            result.innerHTML = 'Error!'
            result.style.color = 'red'
        })
}