const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { salesProductsModel, salesModel } = require('../../../src/models');
const { salesProductsService } = require('../../../src/services');

describe('Testa a camada Sales Products Service', function () {
  describe('Testa a camada Sales Products Service para a função "registerSalesProducts"', function () {
    it('Registra noos produtos vendidos', async function () {
      const salesId = 1;
      const salesProducts = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 5 }
      ];

      sinon.stub(salesProductsModel, 'insert');

      const response = await salesProductsService.registerSalesProducts(salesProducts, salesId);

      expect(response).to.be.deep.equal(undefined);

    });
  });

   describe('Testa a camada Sales Products Service para a função "requestSaleById"', function () {
    it('Registra novos produtos vendidos', async function () {
      const salesId = 2;
      const responseModel = [ { id: 2, date: '2022-10-12T23:10:10.000Z' } ];

      sinon.stub(salesModel, 'findById').resolves(responseModel);
      sinon.stub(salesProductsModel, 'findById').resolves(responseModel);

      const response = await salesProductsService.requestSaleById(salesId);

      expect(response).to.be.deep.equal(responseModel);

    });

    it('Tenta registrar novos produtos vendidos quando o Id da venda não existe', async function () {
      const salesId = 2;
      sinon.stub(salesModel, 'findById').resolves([]);
      const response = await salesProductsService.requestSaleById(salesId);

      expect(response).to.be.deep.equal({ message: 'Sale not found' });

    });

     afterEach(function () { sinon.restore() });
  });
});
