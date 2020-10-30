export function getAcceptedRate(accepted, submited) {
  let rate = submited === 0 ? 0.0 : ((accepted / submited) * 100).toFixed(2)
  return `${rate}%`
}
