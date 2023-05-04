import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class AbstractPages {

  /**
   * ---------------------------------------------------------------------------
   *
   *        Converters Util
   *
   * ---------------------------------------------------------------------------
   */


  convertToDate(data: string): any {
    if(data) {
      let dateParts = data.split("/");
      const day = Number(dateParts[0]);
      const mouth = Number(dateParts[1]);
      const year = Number(dateParts[2]);
      return new Date(mouth, day, year);
    }
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   *
   *        ALERT
   *
   * ---------------------------------------------------------------------------
   */

  public alertType!: string;
  public alertMessage: string = '';

  private alertSubject = new Subject<string>();

  /** Alert componente */
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  showMessage(message: string, type: string) {
    console.log('MENSAGEM => ' + message);
    this.alertType = type;
    this.alertSubject.next(message);
  }

  buildAlert() {
    this.alertSubject.subscribe((message) => (this.alertMessage = message));
    this.alertSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  /**
   * ---------------------------------------------------------------------------
   *
   *        HTTP Utils
   *
   * ---------------------------------------------------------------------------
   */


  /**
   * Retorna item do local storage
   * @param name chave do item
   */
  getStorageItem(name: string): string {
    return window.localStorage.getItem(name) as string || '';
  }

  /**
   * Adiciona item no local storage
   * @param name chave do item
   * @param value valor do item
   */
  setStorageItem(name: string, value: string): void {
    window.localStorage.setItem(name, value);
  }

  /**
   *
   * @param url Obtem header padrão para as requisições
   * @returns
   */
  getHeaders(): HttpHeaders {
    const TOKEN = this.getStorageItem('JWT_TOKEN');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'JWT_TOKEN': TOKEN
    });
  }
}
