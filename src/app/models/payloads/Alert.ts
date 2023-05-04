export interface Alert {
	type: string;
	message: string;
}

export const ALERTS: Alert[] = [
	{
		type: 'success',
		message: 'Operação realizada com sucesso!',
	},
	{
		type: 'info',
		message: '',
	},
	{
		type: 'warning',
		message: '',
	},
	{
		type: 'danger',
		message: 'Não foi possível realizar a operação!',
	}
];

export class AlertType {
  public static success = 'success';
  public static info    = 'info';
  public static warning = 'warning';
  public static error  = 'danger';
}
