const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService')
const productsController = require('../../controllers/productsController');

describe('CONTROLLER - Verify products endpoint', () => {
  
  describe('Should return a list of products', () => {
    const response = {};
    const request = {};
    const next = () => { };
    
      before(() => {
        response.status = sinon.stub().returns(response);
        
        sinon.stub(productsService, 'getAll').resolves(true);
      });
      
      after(() => {
        productsService.getAll.restore();
      });
    
      it('When returns status 200', async () => {
        await productsController.getAll(request, response, next);      
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  });

  describe("Should return the product witch have the id requested", () => {
    const response = {};
    const request = { params: {} };
    next = () => { };
    
      before(() => {
        response.status = sinon.stub().returns(response);
        sinon.stub(productsService, 'getById').resolves(true);
      });
      
      after(() => {
        productsService.getById.restore();
      });
      
      it('When returns valid data', async () => {
        await productsController.getById(request, response, next);        
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  });

  describe("Should return an response", () => {
    const response = {};
    const request = { body: {} };
    next = () => { };
  
      before(() => {
        response.status = sinon.stub().returns(response);
        sinon.stub(productsService, 'addProduct').resolves(true);
      });
      
      after(() => {
        productsService.addProduct.restore();
      });
      
      it('When returns valid data', async () => {
        await productsController.addProduct(request, response, next);        
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  });

});