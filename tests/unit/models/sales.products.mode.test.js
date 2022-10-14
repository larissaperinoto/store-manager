const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const { salesProductsModel } = require('../../../src/models');

describe('Testa a camada Sales Products mMdel', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada Sales Products Model para a função "insert"', function () {
    it('Faz a inserção de novos produtos vendidos', async function () {
      const products = [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ];

      sinon.stub(connection, 'execute').resolves([]);

      const response = await salesProductsModel.insert(products, 1);

      expect(response).to.be.deep.equal(undefined);
    });
  });

  describe('Testa a camada Sales Products Model para a função "findById"', function () {
    it('Procura uma venda pelo Id', async function () {
      const responseDB = [
        {
          date: '2022-10-12T20:05:12.000Z',
          productId: 1,
          quantity: 5
        }
      ];

      sinon.stub(connection, 'execute').resolves([responseDB]);

      const response = await salesProductsModel.findById(1);

      expect(response).to.be.deep.equal(responseDB);
    });
  });

  describe('Testa a camada Sales Products Model para a função "update"', function () {
    it('Faz o update dos produtos para uma venda', async function () {
      const salesProducts = [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }];
      const saleId = 100;

      sinon.stub(connection, 'execute')

      const response = await salesProductsModel.update(saleId, salesProducts);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('Testa a camada Sales Products Model para a função "findyProductBySaleId"', function () {
    it('Faz a busca pelos produtos que corrrespondema um Id de uma venda', async function () {
      const responseDB = [
        { productId: 1, quantity: 10, saleId: 100 },
        { productId: 2, quantity: 50, saleId: 100 }
      ];

      const saleId = 100;

      sinon.stub(connection, 'execute').resolves([responseDB]);

      const response = await salesProductsModel.findyProductBySaleId(saleId);

      expect(response).to.be.deep.equal(responseDB);
    });
  });
});