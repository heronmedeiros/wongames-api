/**
 * game service
 */
import axios from 'axios';
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::game.game', () => ({
  async populate(params) {
    const gogUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game`;

      const {
        data: { products }
      } = await axios.get(gogUrl);

      console.log(products[0]);
  }
}));
