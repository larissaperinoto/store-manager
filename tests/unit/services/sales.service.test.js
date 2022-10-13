const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService, productsService } = require('../../../src/services');
const salesMock = require('../models/mock/sales.model.mock');

describe('Testa a camada Sales Service', function () {
  describe('Testa a camada Sales Service para a função "requestSales"', function () {
    it('Busca por todas as vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesMock);

      const response = await salesService.requestSales();

      expect(response).to.be.deep.equal(salesMock);

    });
  });

  describe('Testa a camada Sales Service para a função "requestSaleById"', function () {
    it('Busca por uma venda pelo Id', async function () {
      const responseMOdel = { id: 1, date: '2022-10-12 13:34:00' };
      const saleId = 1;

      sinon.stub(salesModel, 'findById').resolves(responseMOdel);

      const response = await salesService.requestSaleById(saleId);

      expect(response).to.be.deep.equal(responseMOdel);

    });

    it('Busca por uma venda cujo Id não existe', async function () {
      const saleId = 1;

      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.requestSaleById(saleId);

      expect(response).to.be.deep.equal({ message: 'Sale not found' });

    });

    afterEach(function () { sinon.restore() });
  });

  describe('Testa a camada Sales Service para a função "registerSales"', function () {
    it('Tenta cadastrar uma nova venda na tabela sales', async function () {
      const sales = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 5 }];
      const productResponse = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Traje de encolhimento' }];
      const insertSaleId = 10;

      sinon
        .stub(productsService, 'requestProductById')
        .onFirstCall()
        .resolves(productResponse[0])
        .onSecondCall()
        .resolves(productResponse[1]);

      sinon.stub(salesModel, 'insert').resolves(insertSaleId);

      const response = await salesService.registerSales(sales);

      expect(response).to.be.equal(insertSaleId);
    });

    it('Tenta cadastrar uma nova venda na tabela sales quando os Ids dos produtos não existem', async function () {
      const sales = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 5 }];
      const productResponse = [{ id: 1, name: 'Martelo de Thor' }, { message: 'Product not found' }];

      sinon
        .stub(productsService, 'requestProductById')
        .onFirstCall()
        .resolves(productResponse[0])
        .onSecondCall()
        .resolves(productResponse[1]);

      const response = await salesService.registerSales(sales);

      expect(response).to.be.deep.equal({ message: 'Product not found' });
    });

    afterEach(function () { sinon.restore() });
  });
});
