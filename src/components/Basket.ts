import { Component } from "./base/component";
import {cloneTemplate, createElement, ensureElement} from "../utils/utils";
import {EventEmitter} from "./base/events";
import { IProduct } from "../types";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
};

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
          this._button.addEventListener('click', () => this.events.emit('basket:order'));
        };
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this._button.disabled = false;
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this._button.disabled = true;
        };
    };

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        };
    };

    set total(total: number) {
        this.setText(this._total, total + ' синапсов');
        if (this._button && !total) {
          this._button.disabled = true;
        };
    };

    refreshIndex() {
        Array.from(this._list.children).forEach(
          (item, index) =>
          (item.querySelector(`.basket__item-index`)!.textContent = (
            index + 1
          ).toString())
        );
      }
}

export interface IProductBasket extends IProduct {
    id: string;
    index: number;
};

export interface IStoreItemBasketActions {
    onClick: (event: MouseEvent) => void;
};
  
export class StoreItemBasket extends Component<IProductBasket> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
  
    constructor(protected blockName: string, container: HTMLElement, actions?: IStoreItemBasketActions) {
      super(container);
  
      this._title = container.querySelector(`.${blockName}__title`);
      this._index = container.querySelector(`.basket__item-index`);
      this._price = container.querySelector(`.${blockName}__price`);
      this._button = container.querySelector(`.${blockName}__button`);
  
      if (this._button) {
        this._button.addEventListener('click', (evt) => {
          this.container.remove();
          actions?.onClick(evt);
        });
      };
    };
  
    set title(value: string) {
      this._title.textContent = value;
    };
  
    set index(value: number) {
      this._index.textContent = value.toString();
    };
  
    set price(value: number) {
        this._price.textContent = value + ' синапсов';
    };
};