
const URL_BASE = 'http://ec2-54-152-157-19.compute-1.amazonaws.com:8080';

export const environment = {
  production: true,
  base: URL_BASE,
  api: {
    login: URL_BASE + '/login',
    categoria: URL_BASE + '/api/categoria',
    cliente: URL_BASE + '/api/cliente',
    produto: URL_BASE + '/api/produto',
    reclamacao: URL_BASE + '/api/reclamacao',
    anexo: URL_BASE + '/api/anexo'
  }
}
