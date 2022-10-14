const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const productsMock = require('../models/mock/products.model.mock');

describe('Testa a camada Products Controller', function () {

  afterEach(function () { sinon.restore() });

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

  describe('Testa a camada Products Controller para a função "updateProduct"', function () {
    it('Tenta atualizar um produto', async function () {
      const req = { params: { id: 10 }, body: { name: 'Bicicleta' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { id: 10, name: 'Bicicleta' };

      sinon.stub(productsService, 'updateProduct').resolves(serviceResponse);

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });

    it('Tenta atualizar um produto que não existe', async function () {
      const req = { params: { id: 10 }, body: { name: 'Bicicleta' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { message: 'Product not found' };

      sinon.stub(productsService, 'updateProduct').resolves(serviceResponse);

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });
  });

   describe('Testa a camada Products Controller para a função "deleteProduct"', function () {
    it('Deleta um produto', async function () {
      const req = { params: { id: 10 } };
      const res = {};

      res.sendStatus = sinon.stub().returns(res);

      sinon.stub(productsService, 'deleteProduct');

      await productsController.deleteProduct(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });

    it('Tenta deletar um produto que não existe', async function () {
      const req = { params: { id: 10 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceResponse = { message: 'Product not found' };

      sinon.stub(productsService, 'deleteProduct').resolves(serviceResponse);

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceResponse);
    });
  });

  describe('Testa a camada Products Controller para a função "searchProduct"', function () {
    it('Busca um produto pelo nome', async function () {
      const req = { query: { q: 'martelo' } };
      const res = {};
      const responseService = [{ id: 1, name: 'Martelo de Thor' }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'requestProductByName').resolves(responseService);

      await productsController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseService);
    });

    it('Busca sem o parametro query', async function () {
      const req = { query: ''};
      const res = {};
      const responseService = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Bicicleta' }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'requestProducts').resolves(responseService);

      await productsController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseService);
    });
  });
});