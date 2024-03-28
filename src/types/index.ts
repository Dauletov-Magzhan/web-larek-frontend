export enum ProductCategory {
	SoftSkill = 'софт-скил',
	HardSkill = 'хард-скил',
	Additional = 'дополнительное',
	Button = 'кнопка',
	Other = 'другое',
}

export interface IProduct {
	id: string;
	category?: ProductCategory;
	title: string;
	image?: string;
	price: number | null;
	description?: string;
	selected: boolean;
}

export interface IAppState {
	catalog: IProduct[];
	basket: string[];
	preview: string | null;
	order: IOrderForm | null;
}

export interface IOrderForm {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
}

export interface IOrder extends IOrderForm {
	items: string[];
	total: number;
}
