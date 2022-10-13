const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const { salesProductsModel } = require('../../../src/models');

describe('Testa a camada Sales Products mMdel', function () {
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

  afterEach(function () { sinon.restore() });

});