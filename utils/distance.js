const degToRad = (degrees) => (degrees * Math.PI) / 180

function getDistanceBetweenCoord(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371

  const φ1 = degToRad(lat1)
  const φ2 = degToRad(lat2)
  const λ1 = degToRad(lng1)
  const λ2 = degToRad(lng2)

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)

  const θ = Math.atan2(y, x)
  return Math.abs(θ * earthRadiusKm)
}

module.exports = { getDistanceBetweenCoord }