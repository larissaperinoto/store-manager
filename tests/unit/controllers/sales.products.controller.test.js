const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesProductsService } = require('../../../src/services');
const { salesProductsController } = require('../../../src/controllers');
const salesMock = require('../models/mock/sales.model.mock');

describe('Testa a camada Sales Products Controller', function () {
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
        ]

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

    afterEach(function () { sinon.restore() });
  });
});
