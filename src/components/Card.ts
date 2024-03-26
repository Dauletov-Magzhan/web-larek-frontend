import { Component } from "./base/component";
import { ensureElement } from "../utils/utils";
import { IProduct, ProductCategory } from "../types";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
};

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._description = container.querySelector(`.${blockName}__text`);
        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
        this._button = container.querySelector(`.${blockName}__button`);

        if (actions?.onClick) {
                container.addEventListener('click', actions.onClick);
        };
    };

    set id(value: string) {
        this.container.dataset.id = value;
    };

    get id(): string {
        return this.container.dataset.id || '';
    };

    set title(value: string) {
        this.setText(this._title, value);
    };

    get title(): string {
        return this._title.textContent || '';
    };

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    };

    set category(value: string) {
        this.setText(this._category, value);
        switch (value) {
            case 'софт-скил':
                this._category.classList.add('card__category_soft');
                break;
            case 'хард-скил':
                this._category.classList.add('card__category_hard');
                break;
            case 'другое':
                this._category.classList.add('card__category_other');
                break;
            case 'кнопка':
                this._category.classList.add('card__category_button');
                break;
            case 'дополнительное':
                this._category.classList.add('card__category_additional');
                break;
        };
    };

    get category(): string {
        return this._category.textContent || '';
    };

    set price(value: string) {
        if(value !== null){
            this.setText(this._price, value + ' синапсов');
        } else {
            this.setText(this._price, 'Бесценно');
        };
        if (this._button && !value) {
            this._button.disabled = true;
        };
    };

    get price(): string {
        return this._price.textContent || '';
    };

    set description(value: string) {
        this.setText(this._description, value);
    };

    get description(): string {
        return this._description.textContent || '';
    };
};


export class CatalogItem extends Card {
    constructor(container: HTMLElement, actions?: ICardActions) {
        super('card', container, actions);
    };
};

export type BasketItemStatus = {
	index: number;
};

export class BasketItem extends Card {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
	};

	set index(value: number) {
		this.setText(this._index, value);
	};
};