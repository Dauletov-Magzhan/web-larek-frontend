import { Model } from "./base/model";
import { IAppState, IProduct, IOrder, ProductCategory, IOrderForm } from "../types";


export type CatalogChangeEvent = {
    catalog: IProduct[]
};

export class ProductItem extends Model<IProduct> {
    id: string;
    category: ProductCategory;
    title: string;
    image: string;
    price: number | null;
    description: string;
    selected: boolean;
};

export class AppState extends Model<IAppState> {
    catalog: IProduct[];
    basket: IProduct[] = [];
    preview: string | null;
    order: IOrder;
    formErrors: IOrderForm = {};


    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    };

    setPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('card-preview:changed', item);
    };

    resetSelected() {
        this.catalog.forEach(item => item.selected = false)
    };

    getTotalPrice() {
        return this.basket.reduce((a, b) => a + b.price, 0);
    };

    addToBasket(value: IProduct) {
            this.basket.push(value);   
    };
    
    getBasketAmount() {
        return this.basket.length;
    };

    deleteProductBasket(id: string) {
        this.basket = this.basket.filter(item => item.id !== id);
    };

    clearBasket() {
        this.basket.length = 0;
    };

    setItems() {
        this.order.items = this.basket.map(item => item.id);
    };

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;
    
        if (this.validateContacts()) {
          this.events.emit('contacts:ready', this.order);
        };
        if (this.validateOrder()) {
          this.events.emit('order:ready', this.order);
        };
    };
    
    validateContacts() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
          errors.email = 'Необходимо указать email';
        };
        if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
        };
        this.formErrors = errors;
        this.events.emit('contactsFormErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    };
    
    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
          errors.address = 'Необходимо указать адрес';
        };
        if (!this.order.payment) {
          errors.payment = 'Необходимо указать способ оплаты';
        };
        this.formErrors = errors;
        this.events.emit('orderFormErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    };
    
    refreshOrder() {
        this.order = {
          items: [],
          total: null,
          address: '',
          email: '',
          phone: '',
          payment: ''
        };
    };
};