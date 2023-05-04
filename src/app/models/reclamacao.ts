export class Reclamacao {
  codigo: string = '';
	descricao: string = '';
	codigoCliente: number = 0;
	codigoCategoria: number = 0;
	codigoProduto: number = 0;
  dataCriacao: Date = new Date();
  statusAberto: boolean = true;
  reincidente: boolean = false;
}
