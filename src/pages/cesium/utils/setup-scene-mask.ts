export function setupSceneMask() {
  const maskDiv = document.createElement('div')
  maskDiv.id = 'global-scene-scene-mask'
  maskDiv.style.cssText = `
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      background-image:
      radial-gradient(rgb(95 84 84 / 13%) 50%, rgb(49 64 97 / 24%) 70%, rgb(22 29 62 / 38%) 90%);
      `
  document.body.append(maskDiv)
}

export function removeSceneMask() {
  const maskDiv = document.querySelector('#global-scene-scene-mask')
  if (maskDiv) {
    maskDiv.remove()
  }
}
