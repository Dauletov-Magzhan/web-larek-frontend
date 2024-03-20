import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import { AppState, CatalogChangeEvent } from './components/AppData';
import { Page } from './components/Page';
import { ProductApi } from './components/ProductAPI';
import { CatalogItem } from './components/Card';

const events = new EventEmitter();
const api = new ProductApi(CDN_URL, API_URL);
const appData = new AppState({}, events);

const contentElement = document.querySelector('.gallery')
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement

const page = new Page(document.body, events);


events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            description: item.description,

        });
    });

});


api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });

console.log(api.getProductList())

