import STORAGE_KEY from '@/constants/storageKey'

export function getAcceptedRate(accepted, submited) {
  let rate = submited === 0 ? 0.0 : ((accepted / submited) * 100).toFixed(2)
  return `${rate}%`
}

export function buildProblemCodeKey(problemID, language = 'C', contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}_${language}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}_${language}`
}
