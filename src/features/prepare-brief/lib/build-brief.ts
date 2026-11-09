export function buildBrief(d: FormData): string {
  return `BRIEFING — ALMA LAB\n\nNome: ${d.get('name')}\nContato: ${d.get('email')}\nÁrea: ${d.get('service')}\nPrazo desejado: ${d.get('deadline') || 'A combinar'}\nInvestimento previsto: ${d.get('budget')}\n\nSobre o projeto:\n${d.get('message')}`
}

export function downloadBrief(brief: string): void {
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'briefing-alma-lab.txt'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
