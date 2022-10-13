const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const productsMock = require('../models/mock/products.model.mock');
const { productsService } = require('../../../src/services');

describe('Testa a camada Products Service', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada Products Service para buscas com Id', function () {
    it('Busca produto por um Id que não existe', async function () {
      const expected = { message: 'Product not found' };

      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.requestProductById(9999);

      expect(response).to.be.deep.equal(expected);

    });

    it('Busca por um Id que existe', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);

      const response = await productsService.requestProductById(2);

      expect(response).to.be.deep.equal(productsMock[0]);
    });
  });

  describe('Testa camada Products Service para retornar todos os produtos', function () {
      it('Busca por um Id que existe', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsMock);

      const response = await productsService.requestProducts();

      expect(response).to.be.deep.equal(productsMock);
    });
  });

  describe('Testa camada Products Service para inserir um novo produtos', function () {
    it('Busca por um Id que existe', async function () {
      const body = { name: 'Abóbora' };
      const expected = { id: 10, name: 'Abóbora' };
      sinon.stub(productsModel, 'insert').resolves({ insertId: 10});

      const response = await productsService.registerProduct(body);

      expect(response).to.be.deep.equal(expected);
    });
  });

   describe('Testa camada Products Service para a função "updateProduct"', function () {
     it('Faz a atualização de um produto', async function () {
       const productName = 'Bicicleta';
       const productId = 10;
       const productUpdated = { id: 10, name: 'Bicicleta' };

      sinon.stub(productsModel, 'findById').resolves({});
      sinon.stub(productsModel, 'update').resolves(productUpdated);

      const response = await productsService.updateProduct(productName, productId);

      expect(response).to.be.deep.equal(productUpdated);
     });

    it('Faz a atualização de um produto cujo Id não existe', async function () {
      const productName = 'Bicicleta';
      const productId = 10;
      const message = { message: 'Product not found' };

      sinon.stub(productsModel, 'findById');

      const response = await productsService.updateProduct(productName, productId);

      expect(response).to.be.deep.equal(message);
    });
   });

  describe('Testa camada Products Service para a função "deleteProduct"', function () {
    it('Deleta um produto', async function () {
      const productId = 10;

      sinon.stub(productsModel, 'findById').resolves({});
      sinon.stub(productsModel, 'deleta');

      const response = await productsService.deleteProduct(productId);

      expect(response).to.be.equal(undefined);
    });

    it('Tenta deletar um produto cujo Id não existe', async function () {
      const productId = 10;
      const responseService = { message: 'Product not found' };

      sinon.stub(productsModel, 'findById').resolves(responseService);

      const response = await productsService.deleteProduct(productId);

      expect(response).to.be.equal(responseService);
    });
  });
});