function fileCheck(obj) {
    let btn = document.querySelector("input[type='submit']")
    let pathpoint = obj.value.lastIndexOf('.')
	let filepoint = obj.value.substring(pathpoint+1,obj.length)
	let filetype = filepoint.toLowerCase()

    if (filetype == 'mp3' || filetype == 'wav') {
        btn.style.display = "inline-block"
        return true
    }else{
        alert('mp3 또는 wav 확장자 파일만 선택 가능합니다.')
        obj.value = ''
        btn.style.display = "none"
		return false
    }
}