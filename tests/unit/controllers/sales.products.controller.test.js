const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesProductsService } = require('../../../src/services');
const { salesProductsController } = require('../../../src/controllers');
const salesMock = require('../models/mock/sales.model.mock');

describe('Testa a camada Sales Products Controller', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada Sales Products Controller para a função "salesProductsById"', function () {
    it('Busca uma venda pelo Id', async function () {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {};
      const serviceResponse = [
        { date: '2022-10-12T23:10:10.000Z', productId: 1, quantity: 5 },
        { date: '2022-10-12T23:10:10.000Z', productId: 2, quantity: 10 }
      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesProductsService, 'requestSaleById').resolves(serviceResponse);

      await salesProductsController.salesProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });

     it('Busca uma venda por um Id que não existe', async function () {
      const req = {
        params: {
          id: 999
        }
      };
      const res = {};
      const serviceResponse = { message: "Product not found" }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesProductsService, 'requestSaleById').resolves(serviceResponse);

      await salesProductsController.salesProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceResponse);
     });
  });

   describe('Testa a camada Sales Products Controller para a função "updateSale"', function () {
    it('Faz a atualização de uma venda', async function () {
      const req = {
        params: {
          id: 100
        },
        body: [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 50 }],
      };
      const res = {};
      const responseService = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 50 }
      ];
      const responseController = { saleId: 100, itemsUpdated: responseService };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesProductsService, 'updateSale').resolves(responseService);

      await salesProductsController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseController);
    });

     it('Tenta fazer uma atualização de venda com Id da venda inexistente', async function () {
      const req = {
        params: {
          id: 999
        },
        body: []
      };
      const res = {};
      const serviceResponse = { message: "Product not found" }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesProductsService, 'updateSale').resolves(serviceResponse);

      await salesProductsController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceResponse);
     });
  });
});
