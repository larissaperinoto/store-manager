const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const { productsModel } = require('../../../src/models');
const productsMock = require('./mock/products.model.mock');

describe('Testa a camada Products model', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada Products Model para a função "findAll"', function () {
    it('Busca por todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const response = await productsModel.findAll();

      expect(response).to.be.deep.equal(productsMock);
    });
  });

  describe('Testa a camada Products Model para a função "findById"', function () {
    it('Busca produto pelo Id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

      const response = await productsModel.findById(1);

      expect(response).to.be.deep.equal(productsMock[0]);
    });
  });

  describe('Testa a camada Products Model para a função "insert"', function () {
    it('Faz a inserção de um novo produto', async function () {
      const expected = { insertId: 100 };
      const product = { name: 'Abóbora' };
      sinon.stub(connection, 'execute').resolves([ { insertId: 100 }]);

      const response = await productsModel.insert(product);

      expect(response).to.be.deep.equal(expected);
    });
  });

  describe('Testa a camada Products Model para a função "update"', function () {
    it('Faz a atualização de um produto', async function () {
      const productName = 'Batata';
      const productId = 10;
      const productUpdated = { name: 'Batata', id: 10 };

      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves()
        .onSecondCall()
        .resolves([[productUpdated]]);

      const response = await productsModel.update(productName, productId);

      expect(response).to.be.deep.equal(productUpdated);
    });
  });

  describe('Testa a camada Products Model para a função "deleta"', function () {
    it('Envia um pedido de delete', async function () {
      const productId = 10;

      sinon.stub(connection, 'execute');

      const response = await productsModel.deleta(productId);

      expect(response).to.be.deep.equal(undefined);
    });
  });
});