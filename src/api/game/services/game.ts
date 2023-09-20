/**
 * game service
 */
import axios from 'axios';
import slugify from 'slugify';
import { JSDOM } from 'jsdom';

import { factories } from '@strapi/strapi';

async function getByName(name, entityService) {
  const item = await strapi.service(entityService).find({
    filters: { name }
  });

  return item.results.length > 0 ? item.results[0] : null;
}

async function create(name, entityService) {
  const item = await getByName(name, entityService);

  if (!item) {
    await strapi
            .service(entityService)
            .create({
              data:{
                name,
                slug: slugify(name, { strict: true, lower: true }),
              }
        })
  }
}

async function getGameInfo(slug) {
  const gogSlug = slug.replaceAll('-','_').toLowerCase();

  const body = await axios.get(`https://gog.com/game/${gogSlug}`);
  const dom = new JSDOM(body.data);

  const rawDescription = dom.window.document.querySelector(".description");
  const description = rawDescription.innerHTML;
  const shortDescription = rawDescription.textContent.slice(0, 160);

  const ratingElement = dom.window.document.querySelector(
    ".age-restrictions__icon use"
  )

  return {
    description,
    shortDescription,
    rating: ratingElement
      ? ratingElement
        .getAttribute('xlink:href')
        .replace(/_/g, "")
        .replace("#","")
      : "BR0",
  }
}

export default factories.createCoreService('api::game.game', () => ({
  async populate(params) {
    const gogUrl = `https://catalog.gog.com/v1/catalog?limit4&order=desc%3Atrending`;

    const {
      data: { products }
    } = await axios.get(gogUrl);

    const product = products[2];

    product.developers.map(async (developer) => {
      await create(developer, "api::developer.developer");
    });

    product.publishers.map(async (publisher) => {
      await create(publisher, "api::publisher.publisher");
    });

    product.genres.map(async ({ name }) => {
      await create(name, "api::category.category");
    });
  }
}));
