# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация 

## Типы данных

```
<!-- Представляет категорию товаров -->
export enum ProductCategory {

    <!-- Категория мягких навыков. -->
    SoftSkill = 'софт-скил',


    <!-- Категория технических навыков. -->
    HardSkill = 'хард-скил',


    <!-- Дополнительная категория для продуктов, которые не подходят под мягкие или технические навыки. -->
    Additional = 'дополнительное',


    <!-- Категория для продуктов, представляющих собой кнопки интерфейса пользователя. -->
    Button = 'кнопка',


    <!-- Другая категория для продуктов, которые не подходят ни под одну из специфических категорий. -->
    Other = 'другое',
};


<!-- Представляет продукт. -->
export interface IProduct {

    <!-- Уникальный идентификатор продукта. -->
    id: string;


    <!-- Опциональная категория продукта. -->
    category?: ProductCategory;


    <!-- Название продукта. -->
    title: string;


    <!-- Опциональный URL изображения, представляющего продукт. -->
    image?: string;


    <!-- Цена продукта. Может быть null, если цена не применима или недоступна. -->
    price: number | null;


    <!-- Опциональное описание продукта. -->
    description?: string;


    <!-- Опциональный индекс для сортировки или упорядочивания продуктов. -->
    index?: number;


    <!-- Указывает, выбран ли в данный момент продукт. -->
    selected: boolean;
};


<!-- Представляет корзину с продуктами. -->
export interface IBasket {

    <!-- Массив продуктов в корзине. -->
    products: IProduct[];


    <!-- Нумерация корзины. -->
    numbering: number;


    <!-- Общая сумма продуктов в корзине. -->
    sum: number;
};

<!-- Представляет состояние приложения. -->
export interface IAppState {

    <!-- Массив продуктов в каталоге. -->
    catalog: IProduct[];


    <!-- Массив идентификаторов продуктов в корзине. -->
    basket: string[];


    <!-- URL предварительного просмотра изображения. -->
    preview: string | null;


    <!-- Детали формы заказа. -->
    order: IOrderForm | null;
};

<!-- Представляет детали формы заказа. -->
export interface IOrderForm {

    <!-- Способ оплаты выбранный для заказа. -->
    payment?: string;


    <!-- Адрес для доставки заказа. -->
    address?: string;


    <!-- Электронная почта клиента. -->
    email?: string;


    <!-- Номер телефона клиента. -->
    phone?: string;
};

<!-- Представляет заказ содержащий товары и итоговую сумму. -->
export interface IOrder extends IOrderForm {

    <!-- Массив идентификаторов продуктов в заказе. -->
    items: string[];


    <!-- Общая стоимость заказа. -->
    total: number;
};
```


### Модель данных

```
Базовый абстрактный класс модели, который предоставляет основные методы и свойства для работы с данными.
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {}

    Сообщить всем что модель поменялась
    emitChanges(event: string, payload?: object) {}
}


Класс AppState представляет глобальное состояние приложения, содержащее каталог товаров, корзину покупок, данные предпросмотра товара, а также информацию о заказе и ошибки формы заказа.
Этот класс расширяет базовый абстрактный класс Model, обеспечивая методы и свойства для работы с данными и уведомлением об изменениях в модели.

export class AppState extends Model<IAppState> {
    // Каталог товаров.
    catalog: IProduct[];

    // Корзина с товарами
    basket: IProduct[] = [];

    // Идентификатор текущего предпросматриваемого товара.
    preview: string | null;

    // Форма заказа
    order: IOrder;

    // Ошибка формы заказа
    formErrors: IOrderForm = {};


    // Устанавливает каталог товаров.
    setCatalog(items: IProduct[]) {};

    // Устанавливает предпросматриваемый товар.
    setPreview(item: IProduct) {};

    // Сбрасывает выборку товаров.
    resetSelected() {};

    // Возврящает итоговую сумму.
    getTotalPrice() {};

    // Добавляет товар в корзину.
    addToBasket(value: IProduct) {};
    
    // Возвращает количество товаров в корзине.
    getBasketAmount() {};

    // Удаляет товар из корзины.
    deleteProductBasket(id: string) {};

    // Очищает корзину покупок.
    clearBasket() {};

    // Устанавливает товары в заказе.
    setItems() {};

    // Устанавливает значение для поля заказа.
    setOrderField(field: keyof IOrderForm, value: string) {};
    
    // Проверяет контактные данные заказа на валидность.
    validateContacts() {};
    
    // Проверяет данные заказа на валидность.
    validateOrder() {};
    
    // Обновляет информацию о заказе, сбрасывая ее к начальным значениям.
    refreshOrder() {};
};
```


### Базовый код

```
// Общий класс для работы с API. Предоставляет методы для выполнения HTTP-запросов.
export class Api {

    // Базовый URL для API.
    readonly baseUrl: string;

    // Опции запроса, такие как заголовки и другие параметры.
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {}


    // Обрабатывает ответ от сервера.
    protected handleResponse(response: Response): Promise<object> {}

    // Выполняет HTTP-запрос методом GET.
    get(uri: string) {}

    // Выполняет HTTP-запрос методом POST.
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {}
}


// Базовый абстрактный класс компонент
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {}

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {}

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {}

    // Скрыть
    protected setHidden(element: HTMLElement) {}

    // Показать
    protected setVisible(element: HTMLElement) {}

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) { }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {}
}
```


### Компоненты модели данных (бизнес-логика)

```
export class ProductApi extends Api {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {};

    // Получает список продуктов.
    getProductList(): Promise<IProduct[]> {};

    //Получает информацию о продукте по его идентификатору.
    getProductItem(id: string): Promise<IProduct> {};
};


// Класс Page представляет компонент страницы приложения, управляющий отображением контента на странице.
export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {};

    // Устанавливает значение счетчика корзины.
    set counter(value: number) {};

    // Устанавливает элементы каталога товаров для отображения на странице.
    set catalog(items: HTMLElement[]) {};

    // Устанавливает блокировку страницы.
    set locked(value: boolean) {};
};

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) { };

    // Устанавливает идентификатор карточки товара.
    set id(value: string) {};

    // Получает идентификатор карточки товара.
    get id(): string {};

    // Устанавливает заголовок карточки товара.
    set title(value: string) {};

    // Получает заголовок карточки товара.
    get title(): string {};

    // Устанавливает изображение карточки товара.
    set image(value: string) {};
    
    // Устанавливает категорию карточки товара и применяет стили в зависимости от категории.
    set category(value: string) {};

    // Получает категорию карточки товара.
    get category(): string {};

    // Устанавливает цену карточки товара.
    set price(value: string) {};

    // Получает цену карточки товара.
    get price(): string {};

    // Устанавливает описание карточки товара.
    set description(value: string) {};

    // Получает описание карточки товара.
    get description(): string {};
};


Класс Basket представляет компонент корзины покупок, отображающий список выбранных товаров и общую стоимость.
export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {}

    // Устанавливает элементы списка в корзине.
    set items(items: HTMLElement[]) {};

    // Устанавливает выбранные элементы в корзине.
    set selected(items: string[]) {};

    // Устанавливает общую стоимость товаров в корзине.
    set total(total: number) {};

    // Обновляет индексы элементов в корзине.
    refreshIndex() {}
}


// Класс StoreItemBasket представляет компонент элемента в корзине магазина, отображающий информацию о товаре в корзине.
export class StoreItemBasket extends Component<IProductBasket> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
  
    constructor(protected blockName: string, container: HTMLElement, actions?: IStoreItemBasketActions) {};
    
    // Устанавливает заголовок элемента корзины магазина.
    set title(value: string) {};

    // Устанавливает индекс элемента в корзине магазина.
    set index(value: number) {};

    // Устанавливает цену элемента в корзине магазина.
    set price(value: number) {};
};


// Класс Order представляет компонент формы заказа, позволяющий выбрать способ оплаты.
export class Order extends Form<IOrderForm> {
    protected _card: HTMLButtonElement;
    protected _cash: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents) {};

    // Отключает активное состояние кнопок выбора способа оплаты.
    disableButtons() {};
};


// Класс `Success` представляет компонент уведомления об успешном действии.
export class Success extends Component<ISuccess> {
    protected _button: HTMLButtonElement;
    protected _description: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessActions) {};

    // Устанавливает описание успешного действия.
    set description(value: number) {};
};
```