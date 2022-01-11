const degToRad = (degrees) => (degrees * Math.PI) / 180

function getDistanceBetweenCoord(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371

  const y1 = degToRad(lat1)
  const y2 = degToRad(lat2)
  const x1 = degToRad(lng1)
  const x2 = degToRad(lng2)

  // const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  // const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)

  //const θ = Math.atan2(y, x)

  const d = Math.sqrt((y1-y2) ** 2 + (x1-x2) ** 2)
  return d * earthRadiusKm * 1000
}

module.exports = { getDistanceBetweenCoord }