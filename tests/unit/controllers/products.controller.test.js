const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const productsMock = require('../models/mock/products.model.mock');

describe('Testa a camada Products Controller', function () {
  describe('Testa a camada Products Controller para a função "allProducts"', function () {
    it('Busca por todos os produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'requestProducts').resolves(productsMock);

      await productsController.allProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });

  describe('Testa a camada Products Controller para a função "productsById"', function () {
    it('Busca pelo produto correspondente ao Id existente', async function () {
      const req = { params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'requestProductById').resolves(productsMock[0]);

      await productsController.productsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock[0]);
    });

    it('Busca pelo produto quando não há Id correspondente', async function () {
      const req = { params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { message: 'Product not found' };

      sinon.stub(productsService, 'requestProductById').resolves(serviceResponse);

      await productsController.productsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });

    afterEach(function () { sinon.restore() });
  });

  describe('Testa a camada Products Controller para a função "newProduct"', function () {
    it('Busca por todos os produtos', async function () {
      const req = { name: 'Batatinha' };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { id: 100, name: 'Batatinha' };

      sinon.stub(productsService, 'registerProduct').resolves(serviceResponse);

      await productsController.newProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });
  });
});