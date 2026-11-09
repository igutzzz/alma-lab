export type ProjectCategory = 'Design' | 'Web' | 'Imagem' | 'Vídeo'
export type ProjectVisual = 'brand' | 'landing' | 'dashboard' | 'schedule' | 'image' | 'motion'

export interface Project {
  id: string
  title: string
  subtitle: string
  category: ProjectCategory
  type: string
  year: string
  visual: ProjectVisual
  challenge: string
  solution: string
  scope: string[]
  note: string
}
