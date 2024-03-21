import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from "./utils/utils";
import { AppState, CatalogChangeEvent } from './components/AppData';
import { Page } from './components/Page';
import { ProductApi } from './components/ProductAPI';
import { CatalogItem } from './components/Card';
import { IProduct } from './types';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';

const events = new EventEmitter();
const api = new ProductApi(CDN_URL, API_URL);
const appData = new AppState({}, events);

const contentElement = document.querySelector('.gallery');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card-catalog:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price

        });
    });

});

events.on('card-catalog:select', (item: IProduct) => {
    appData.setPreview(item);
});

events.on('card-preview:changed', (item: IProduct) => {
    const showItem = (item: IProduct) => {
        const card = new CatalogItem(cloneTemplate(cardPreviewTemplate));

        modal.render({
            content: card.render({
                title: item.title,
                image: item.image,
                description: item.description,
                category: item.category,
                price: item.price
            })
        });
    };

    if (item) {
        api.getProductItem(item.id)
            .then(() => {
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });


