import { IEvents } from './base/events';
import { Form } from './common/Form';
import { IOrderForm } from '../types';


export class Order extends Form<IOrderForm> {
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;

  constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this._card = container.elements.namedItem('card') as HTMLButtonElement;
    this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        this._cash.classList.add('button_alt-active');
        this._card.classList.remove('button_alt-active');
        this.onInputChange('payment', 'cash');
      });
    };
    if (this._card) {
      this._card.addEventListener('click', () => {
        this._card.classList.add('button_alt-active');
        this._cash.classList.remove('button_alt-active');
        this.onInputChange('payment', 'card');
      });
    };
  };

  disableButtons() {
    this._cash.classList.remove('button_alt-active');
    this._card.classList.remove('button_alt-active');
  };
};


export class Contacts extends Form<IOrderForm> {
    constructor(container: HTMLFormElement,events: IEvents) {
      super(container, events);
    };
};