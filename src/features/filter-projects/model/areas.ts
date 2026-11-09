import type { Project, ProjectCategory } from '~/entities/project'

export type ProjectArea = 'Todos' | ProjectCategory

export const areas: ProjectArea[] = ['Todos', 'Design', 'Web', 'Imagem', 'Vídeo']

export const filterProjects = (list: Project[], area: ProjectArea): Project[] =>
  list.filter((p) => area === 'Todos' || p.category === area)
