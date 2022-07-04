const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

const {allProductsResponse} = require('../../__tests__/_dataMock');
const listOfProducts = [...allProductsResponse];


describe('SERVICE - Verify products endpoint', () => {

  describe('Should return a list of products', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(listOfProducts);
    });
    
    after(() => {
      productsModel.getAll.restore();
    });
  
    it('When returns valid data', async () => {
      const response = await productsService.getAll();      
      expect(response).to.equal(listOfProducts);
    });
  });

  describe("Should return the product witch have the id requested", () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ id: 2, name: 'Traje de encolhimento' }]);
    });
    
    after(() => {
      productsModel.getById.restore();
    });
    
    it('When id requested exist on dataBase', async () => {
      const response = await productsService.getById('2');
      expect(response.name).to.equal('Traje de encolhimento');
    })
  });

  describe("Should return an error if there is not product with requested id", () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ status: 404, message: 'Product not found' }]);
    });
    
    after(() => {
      productsModel.getById.restore();
    });
    
    it('When returns an error', async () => {
      const response = await productsService.getById('111');      
      expect(response.status).to.equal(404);
    })
  });

  describe("Should send an valid name to add a product on dataBase", () => {
    const returnValue = {};

    before(() => {
      sinon.stub(productsModel, 'addProduct').resolves(returnValue);
    });
    
    after(() => {
      productsModel.addProduct.restore();
    });
    
    it('When returns is success', async () => {
      const response = await productsService.addProduct('Product');      
      expect(response).to.be.a('object');
    })
  });

});