const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService, salesProductsService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const salesMock = require('../models/mock/sales.model.mock');

describe('Testa a camada Sales Controller', function () {
  describe('Testa a camada Sales Controller para a função "allSales"', function () {
    it('Busca por todas as vendas', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'requestSales').resolves(salesMock);

      await salesController.allSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock);
    });
  });

   describe('Testa a camada Sales Controller para a função "insertSale"', function () {
    it('Faz a inserção de novas vendas', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      };
      const res = {};
      const insertSaleId = 10;
      const response = { id: insertSaleId, itemsSold: req.body };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'registerSales').resolves(insertSaleId);
      sinon.stub(salesProductsService, 'registerSalesProducts');

      await salesController.insertSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(response);
    });

    it('Tenta inserir novas vendas sem o id do produto', async function () {
      const req = {
        body: [
          {
            quantity: 1
          },
        ]
      };
      const res = {};
      const message = { message: 'Product not found' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'registerSales').resolves(message);
      sinon.stub(salesProductsService, 'registerSalesProducts');

      await salesController.insertSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(message);
    });

     afterEach(function () { sinon.restore() });
  });
});
