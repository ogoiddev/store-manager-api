const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../server/connection');
const productsModel = require('../../models/productsModel');

const {allProductsResponse} = require('../../__tests__/_dataMock');

describe('MODEL - Verify products endpoint', () => {

  describe('Should return a list of products', () => {
    before(() => {
      const listOfProducts = [...allProductsResponse];
      sinon.stub(connection, 'query').resolves(listOfProducts);
    });
    
    after(() => {
      connection.query.restore();
    });
  
    it('When returns an valid data', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.a('object');
    });
  });

  describe('Should return the product witch have the id requested', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([{ id: 2, name: 'Traje de encolhimento' }]);
    });
    
    after(() => {
      connection.query.restore();
    });
    
    it('When id requested exist on dataBase', async () => {
      const response = await productsModel.getById('2');
      expect(response.name).to.equal('Traje de encolhimento');
    });
  });

  describe('Should return an empty value', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([[]]);
    });
  
    after(() => {
      connection.query.restore();
    });

    it('When id requested NOT exist on dataBase', async () => {
      const response = await productsModel.getById('22');      
      expect(response.length).to.equal(0);
    });
  });

  describe('Should add product on dataBase with the name requested and receive back the registered id', () => {
    const returnValue = {};

    before(() => {
      sinon.stub(connection, 'query').resolves([returnValue]);      
    });
  
    after(() => {
      connection.query.restore();
    });

    it('When registered on dataBase', async () => {
      const response = await productsModel.addProduct("Product");      
      expect(response).to.be.a('object');
    });
  });

});