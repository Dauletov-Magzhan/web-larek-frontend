import { Model } from "./base/model";
import { IAppState, IProduct, IOrderForm, ProductCategory } from "../types";

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
}

export class AppState extends Model<IAppState> {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrderForm | null;

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }
}