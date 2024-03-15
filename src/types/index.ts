export enum ProductCategory {
    SoftSkill = 'софт-скил',
    HardSkill = 'хард-скил',
    Additional = 'дополнительное',
    Button = 'кнопка',
    Other = 'другое',
}

export enum PaymentMethod {
    Online = 'online',
    Offline = 'offline',
}

export interface IProductItem {
    id: string;
    category?: ProductCategory;
    title: string;
    image?: string;
    price: number | null;
    description?: string;
}

export interface IBasket {
    products: IProductItem;
    numbering: number;
    sum: number;
}

export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    order: IOrderForm | null;
}


export interface IPaymentAddress {
    payment: PaymentMethod;
    address: string;
}

export interface IOrderForm {
    email: string;
    phone: string;
}

