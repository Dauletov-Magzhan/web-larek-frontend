export enum ProductCategory {
    SoftSkill = 'софт-скил',
    HardSkill = 'хард-скил',
    Additional = 'дополнительное',
    Button = 'кнопка',
    Other = 'другое',
}

export enum PaymentMethod {
    Online = 'Онлайн',
    Offline = 'При получении',
}

export interface IProduct{
    id: string;
    category?: ProductCategory;
    title: string;
    image?: string;
    price: number | null;
    description?: string;
}

export interface IBasket {
    products: IProduct;
    numbering: number;
    sum: number;
}

export interface IAppState {
    catalog: IProduct[];
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

export interface IOrder extends IOrderForm {
    items: string[]
}

export interface IOrderResult {
    id: string;
}