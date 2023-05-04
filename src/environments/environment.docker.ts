
const URL_BASE = 'http://localhost:9080';

export const environment = {
  production: false,
  base: URL_BASE,
  api: {
    login: URL_BASE + '/login',
    categoria: URL_BASE + '/categoria',
    cliente: URL_BASE + '/cliente',
    produto: URL_BASE + '/produto',
    reclamacao: URL_BASE + '/reclamacao',
    anexo: URL_BASE + '/anexo'
  }
}
