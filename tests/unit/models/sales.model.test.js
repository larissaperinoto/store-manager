const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const { salesModel } = require('../../../src/models');
const salesModelMock = require('./mock/sales.model.mock');

describe('Testa a camada Sales mMdel', function () {
  describe('Testa a camada Sales Model para a função "findAll"', function () {
    it('Busca por todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesModelMock]);

      const response = await salesModel.findAll();

      expect(response).to.be.deep.equal(salesModelMock);
    });
  });

  describe('Testa a camada Sales Model para a função "insert"', function () {
    it('Faz a inserção de uma nova venda', async function () {
      const saleDate = '2022-10-12 13:34:00';

      sinon.stub(connection, 'execute').resolves([{ insertId: 12 }]);

      const response = await salesModel.insert(saleDate);

      expect(response).to.be.deep.equal(12);
    });
  });

  describe('Testa a camada Sales Model para a função "findById"', function () {
    it('Busca uma venda pelo Id', async function () {
      const responseDB = { id: 1, date: '2022-10-12T20:05:12.000Z' };

      sinon.stub(connection, 'execute').resolves([responseDB]);

      const response = await salesModel.findById(1);

      expect(response).to.be.deep.equal(responseDB);
    });
  });

  afterEach(function () { sinon.restore() });

});

