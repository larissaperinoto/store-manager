const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;
const {
  validateProductNameField,
  validateProductNameSize,
} = require('../../../src/middlewares/validateProductNameField');

describe('Testa o middleware de validação do nome do Produto', function () {
  it('Tenta adicionar um produto sem o campo "name"', async function () {
    const req = { body: {} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await validateProductNameField(req, res);
    expect(res.status).to.have.been.calledOnceWith(400);
    expect(res.json).to.have.been.calledOnceWith({ message: '"name" is required' });
  });

  it('Tenta adicionar um produto com o campo "name" menor que 5 caracteres', async function () {
    const req = { body: { name: 'ovo' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub().returns();

    await validateProductNameSize(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
      .calledOnceWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () { sinon.restore() });
});
