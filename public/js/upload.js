const dropArea = document.querySelector('#drop-area')
const button = document.querySelector('#button')
const progressSpan = document.querySelector('#progress')
const progressBar = document.querySelector('#progress-bar')

let filesDone = 0
let filesToDo = 0
let uploadProgress = []
let filesCnt = 0

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

function highlight() {
    dropArea.classList.add('highlight')
    button.classList.add('highlight')
}

function unhighlight() {
    dropArea.classList.remove('highlight')
    button.classList.remove('highlight')
}


function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    progressSpan.style.display = 'inline'
    if(document.querySelector('#result'))
        document.querySelector('#result').remove()
    handleFiles(files)
}

function handleFiles(files) {
    ([...files]).forEach(function (item, i) {
        if (item.name.substr(-3, 3) == 'mp3' || item.name.substr(-3, 3) == 'wav') {
            filesCnt++
            uploadFile(item, i)
        } else {
        }
    })
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.value = total
    if(progressBar.value == 100){
        progressSpan.style.display = 'none'
        createResult()

    }
}

function createResult(){
    let resultP = document.querySelector('.result')
    let result = document.createElement('div')
    result.setAttribute('id','result')
    result.innerHTML = `음악 ${filesCnt}개 업로드 완료!`
    resultP.appendChild(result)
}

function uploadFile(file, i) {
    const url = '/cloud/media/uploader'
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    xhr.open('POST', url, true)

    xhr.upload.addEventListener("progress", function (e) {
        updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    })

    xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 성공 했을떄
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            // 에러 났을떄
        }
    })

    formData.append('file', file)
    xhr.send(formData)
}