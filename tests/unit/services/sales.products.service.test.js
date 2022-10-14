const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { salesProductsModel, salesModel, productsModel } = require('../../../src/models');
const { salesProductsService } = require('../../../src/services');

describe('Testa a camada Sales Products Service', function () {

  afterEach(function () { sinon.restore() });

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
  });

  describe('Testa a camada Sales Products Service para a função "updateSale"', function () {
    it('Atualiza produtos para uma venda', async function () {
      const salesId = 100;
      const salesProducts = [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }];
      const responseDB = [
        { productId: 1, quantity: 10, salesId: 100 },
        { productId: 2, quantity: 50, salesId: 100 }
      ];

      sinon.stub(salesModel, 'findById').resolves([{}]);
      sinon.stub(productsModel, 'findById').resolves([{}]);
      sinon.stub(salesProductsModel, 'update');
      sinon.stub(salesProductsModel, 'findyProductBySaleId').resolves(responseDB);

      const response = await salesProductsService.updateSale(salesId, salesProducts);

      expect(response).to.be.deep.equal(responseDB);

    });

    it('Tenta atualizar novos produtos vendidos quando o Id da venda não existe', async function () {
      const salesId = 100;
      const salesProducts = [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }];
      const saleNotExists = { message: 'Sale not found' }

      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesProductsService.updateSale(salesId, salesProducts);

      expect(response).to.be.deep.equal(saleNotExists);
    });

    it('Tenta atualizar novos produtos vendidos quando o Id do produto não existe', async function () {
      const salesId = 100;
      const salesProducts = [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }];
      const productNotExists = { message: 'Product not found' }

      sinon.stub(salesModel, 'findById').resolves([{}]);
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await salesProductsService.updateSale(salesId, salesProducts);

      expect(response).to.be.deep.equal(productNotExists);
    });
  });
});
