const context = new AudioContext()
const mediaElement = document.querySelector('#player')
const sourceNode = context.createMediaElementSource(mediaElement)


let gainDb = -40.0
let bandSplit = [360, 3600]

let hBand = context.createBiquadFilter()
hBand.type = "lowshelf"
hBand.frequency.value = bandSplit[0]
hBand.gain.value = gainDb

let hInvert = context.createGain()
hInvert.gain.value = -1.0

let mBand = context.createGain()

let lBand = context.createBiquadFilter()
lBand.type = "highshelf"
lBand.frequency.value = bandSplit[1]
lBand.gain.value = gainDb

let lInvert = context.createGain()
lInvert.gain.value = -1.0

sourceNode.connect(lBand)
sourceNode.connect(mBand)
sourceNode.connect(hBand)

hBand.connect(hInvert)
lBand.connect(lInvert)

hInvert.connect(mBand)
lInvert.connect(mBand)

let lGain = context.createGain()
let mGain = context.createGain()
let hGain = context.createGain()

lBand.connect(lGain)
mBand.connect(mGain)
hBand.connect(hGain)

let sum = context.createGain()
lGain.connect(sum)
mGain.connect(sum)
hGain.connect(sum)
sum.connect(context.destination)


function changeGain(val, type) {
    let value = parseFloat(val) / 100.0
    switch (type) {
        case 'lowGain': lGain.gain.value = value; break;
        case 'midGain': mGain.gain.value = value; break;
        case 'highGain': hGain.gain.value = value; break;
    }
}

function init() {
    if (context.state == 'suspended')
        context.resume()
}