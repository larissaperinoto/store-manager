const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const { productsModel } = require('../../../src/models');
const productsMock = require('./mock/products.model.mock');

describe('Testa a camada Products model', function () {
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

  afterEach(function () { sinon.restore() });
});