const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const productsMock = require('../models/mock/products.model.mock');
const { productsService } = require('../../../src/services');

describe('Testa a camada Products Service', function () {
  describe('Testa a camada Products Service para buscas com Id', function () {
    it('Busca produto por um Id que não existe', async function () {
      const expected = { message: 'Product not found' };

      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.requestProductsById(9999);

      expect(response).to.be.deep.equal(expected);

    });

    it('Busca por um Id que existe', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);

      const response = await productsService.requestProductsById(2);

      expect(response).to.be.deep.equal(productsMock[0]);
    });

    afterEach(function () { sinon.restore() });
  });

  describe('Testa camada Products Service para retornar todos os produtos', function () {
      it('Busca por um Id que existe', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsMock);

      const response = await productsService.requestProducts();

      expect(response).to.be.deep.equal(productsMock);
    });
  });

  describe('Testa camada Products Service para inserir um novo produtos', function () {
    it('Busca por um Id que existe', async function () {
      const body = { name: 'Abóbora' };
      const expected = { id: 10, name: 'Abóbora' };
      sinon.stub(productsModel, 'insert').resolves({ insertId: 10});

      const response = await productsService.registerProduct(body);

      expect(response).to.be.deep.equal(expected);
    });
  });
});