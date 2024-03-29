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
- src/scss/styles.scss — корневой файл стилей
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

### Типы данных

```
Представляет категорию товаров
enum ProductCategory {
    SoftSkill = 'софт-скил', - Категория мягких навыков.
    HardSkill = 'хард-скил', - Категория технических навыков.
    Additional = 'дополнительное', - Дополнительная категория для продуктов, которые не подходят под мягкие или технические навыки.
    Button = 'кнопка', - Категория для продуктов, представляющих собой кнопки интерфейса пользователя.
    Other = 'другое', - Другая категория для продуктов, которые не подходят ни под одну из специфических категорий.
}


Представляет продукт.
interface IProduct {
    id: string; - Уникальный идентификатор продукта.
    category?: ProductCategory; - Опциональная категория продукта.
    title: string; - Название продукта.
    image?: string; - Опциональный URL изображения, представляющего продукт.
    price: number | null; - Цена продукта. Может быть null, если цена не применима или недоступна.
    description?: string; - Опциональное описание продукта.
    selected: boolean; - Указывает, выбран ли в данный момент продукт.
}


Представляет состояние приложения.
interface IAppState {
    catalog: IProduct[]; - Массив продуктов в каталоге.
    basket: string[]; - Массив идентификаторов продуктов в корзине.
    preview: string | null; - URL предварительного просмотра изображения.
    order: IOrderForm | null; - Детали формы заказа.
}


Представляет детали формы заказа.
interface IOrderForm {    
    payment?: string; - Способ оплаты выбранный для заказа.
    address?: string; - Адрес для доставки заказа.
    email?: string; - Электронная почта клиента.
    phone?: string; - Номер телефона клиента.
}


Представляет заказ содержащий товары и итоговую сумму.
interface IOrder extends IOrderForm {
    items: string[]; - Массив идентификаторов продуктов в заказе.
    total: number; - Общая стоимость заказа.
}
```


### Модель данных

```
Класс AppState представляет глобальное состояние приложения, содержащее каталог товаров, корзину покупок, данные предпросмотра товара, а также информацию о заказе и ошибки формы заказа.
Этот класс расширяет базовый абстрактный класс Model, обеспечивая методы и свойства для работы с данными и уведомлением об изменениях в модели.
class AppState extends Model<IAppState> 
    catalog: IProduct[]; - Каталог товаров.
    basket: IProduct[] = []; - Корзина с товарами.
    preview: string | null; - Карточка текущего предпросматриваемого товара.
    order: IOrder; - Форма заказа
    formErrors: IOrderForm = {} - Ошибка формы заказа

    Методы:
    setCatalog(items: IProduct[]) - Устанавливает каталог товаров.
    setPreview(item: IProduct) - Устанавливает предпросматриваемый товар.
    resetSelected() - Сбрасывает выборку товаров.
    getTotalPrice() - Возврящает итоговую сумму.
    addToBasket(value: IProduct)- Добавляет товар в корзину.
    getBasketAmount() - Возвращает количество товаров в корзине.
    deleteProductBasket(id: string) - Удаляет товар из корзины.
    clearBasket() - Очищает корзину покупок.
    setItems() - Устанавливает товары в заказе.
    setOrderField(field: keyof IOrderForm, value: string) - Устанавливает значение для поля заказа.
    validateContacts() - Проверяет контактные данные заказа на валидность.
    validateOrder() - Проверяет данные заказа на валидность.
    refreshOrder() - Обновляет информацию о заказе, сбрасывая ее к начальным значениям.
```


### Базовый код

```
Общий класс для работы с API. Предоставляет методы для выполнения HTTP-запросов.
class Api 
    readonly baseUrl: string; - Базовый URL для API.
    protected options: RequestInit; - Опции запроса, такие как заголовки и другие параметры.

    constructor(baseUrl: string, options: RequestInit = {}) 

    Методы:
    protected handleResponse(response: Response): Promise<object> - Обрабатывает ответ от сервера.
    get(uri: string) - Выполняет HTTP-запрос методом GET.
    post(uri: string, data: object, method: ApiPostMethods = 'POST') - Выполняет HTTP-запрос методом POST.


Базовый абстрактный класс компонент
abstract class Component<T> 
    protected constructor(protected readonly container: HTMLElement) 

    Методы:
    toggleClass(element: HTMLElement, className: string, force?: boolean) - Переключить класс
    protected setText(element: HTMLElement, value: unknown) - Установить текстовое содержимое
    setDisabled(element: HTMLElement, state: boolean) - Сменить статус блокировки
    protected setHidden(element: HTMLElement) - Скрыть
    protected setVisible(element: HTMLElement) - Показать
    protected setImage(element: HTMLImageElement, src: string, alt?: string) - Установить изображение с алтернативным текстом
    render(data?: Partial<T>): HTMLElement - Вернуть корневой DOM-элемент


Класс EventEmitter - Брокер событий, классическая реализация в расширенных вариантах есть возможность подписаться на все события
или слушать события по шаблону например
class EventEmitter implements IEvents
	_events: Map<EventName, Set<Subscriber>>;

	constructor() 

	Методы:
	on<T extends object>(eventName: EventName, callback: (event: T) => void) - Установить обработчик на событие
	off(eventName: EventName, callback: Subscriber) - Снять обработчик с события
	emit<T extends object>(eventName: string, data?: T) - Инициировать событие с данными
	onAll(callback: (event: EmitterEvent) => void) - Слушать все события
	offAll() - Сбросить все обработчики
	trigger<T extends object>(eventName: string, context?: Partial<T>) - Сделать коллбек триггер, генерирующий событие при вызове


Базовый абстрактный класс модели, который предоставляет основные методы и свойства для работы с данными.
abstract class Model<T> 
    constructor(data: Partial<T>, protected events: IEvents) 

    Методы:
    emitChanges(event: string, payload?: object) - Сообщить всем что модель поменялась
```


### Компоненты модели данных (бизнес-логика)

```
Класс ProductApi получает информацию о продукте из API
class ProductApi extends Api 
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit)

    Методы:
    getProductList(): Promise<IProduct[]> - Получает список продуктов.
    getProductItem(id: string): Promise<IProduct> - Получает информацию о продукте по его идентификатору.


Класс Page представляет компонент страницы приложения, управляющий отображением контента на странице.
class Page extends Component<IPage> 
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents)

    Сеттеры:
    set counter(value: number) - Устанавливает значение счетчика корзины.
    set catalog(items: HTMLElement[]) - Устанавливает элементы каталога товаров для отображения на странице.
    set locked(value: boolean) - Устанавливает блокировку страницы.


Класс Card устанавливает элементы карточки товаров
class Card extends Component<IProduct> 
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions)  

    Сеттеры и геттеры:
    set id(value: string) - Устанавливает идентификатор карточки товара.
    get id(): string - Получает идентификатор карточки товара.
    set title(value: string) - Устанавливает заголовок карточки товара.
    get title(): string - Получает заголовок карточки товара.
    set image(value: string) - Устанавливает изображение карточки товара.
    set selected(value: boolean) - устанавливает выбран ли товар.
    set category(value: string) - Устанавливает категорию карточки товара и применяет стили в зависимости от категории.
    get category(): string - Получает категорию карточки товара.
    set price(value: string) - Устанавливает цену карточки товара.
    get price(): string - Получает цену карточки товара.
    set description(value: string) - Устанавливает описание карточки товара.
    get description(): string - Получает описание карточки товара.


Класс Basket представляет компонент корзины покупок, отображающий список выбранных товаров и общую стоимость.
class Basket extends Component<IBasketView> 
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) 

    Сеттеры:
    set items(items: HTMLElement[]) - Устанавливает элементы списка в корзине.
    set selected(items: string[]) - Устанавливает выбранные элементы в корзине.
    set total(total: number) - Устанавливает общую стоимость товаров в корзине.

    Методы:
    refreshIndex() - Обновляет индексы элементов в корзине.


Класс StoreItemBasket представляет компонент элемента в корзине магазина, отображающий информацию о товаре в корзине.
class StoreItemBasket extends Component<IProductBasket> 
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
  
    constructor(protected blockName: string, container: HTMLElement, actions?: IStoreItemBasketActions)
    
    Сеттеры
    set title(value: string) - Устанавливает заголовок элемента корзины магазина.
    set index(value: number) - Устанавливает индекс элемента в корзине магазина.
    set price(value: number) - Устанавливает цену элемента в корзине магазина.


Класс Order представляет компонент формы заказа, позволяющий выбрать способ оплаты.
class Order extends Form<IOrderForm> 
    protected _card: HTMLButtonElement;
    protected _cash: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents)

    Методы:
    disableButtons() - Отключает активное состояние кнопок выбора способа оплаты.


Класс `Success` представляет компонент уведомления об успешном действии.
class Success extends Component<ISuccess> 
    protected _button: HTMLButtonElement;
    protected _description: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessActions)

    Сеттеры:
    set description(value: number) - Устанавливает описание успешного действия.
```

### Описание событий

```
'items:changed' - обновление каталога.
'card-catalog:select' - вызывается метод setPreview объекта appData.
'card-preview:changed' - вызывает функцию showItem, которая отображает модальное окно с предварительным просмотром товара.
'card:toBasket' - предназначен для добавления товара в корзину.
'basket:open' - открывает корзину.
'basket:delete' - удаляет товар при клике иконки удаление товара в корзине.
'basket:order' - отображает форму оформления заказа в модальном окне при нажатии на соответствующий элемент.
'orderFormErrors:change' - реагирует на изменение ошибок в форме заказа.
'contactsFormErrors:change' - реагирует на изменение ошибок в форме заполнения данных клиента.
'orderInput:change' - реагирует на изменения в полях формы заказа и обновляет соответствующие данные в приложении.
'order:submit' - позволяет обработать событие отправки заказа, вычислить общую стоимость заказа, обновить данные о товарах в заказе и отобразить форму для ввода контактной информации в модальном окне.
'contacts:submit' - реализует отправку данных заказа на сервер при отправке контактной информации из формы, а также обработку успешного и неудачного ответа от сервера.
'order:success' - позволяет отобразить модальное окно с информацией об успешном оформлении заказа
'modal:open' - открывает модальное окно.
'modal:close'- закрывает модальное окно.
```