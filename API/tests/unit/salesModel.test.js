const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../server/connection');
const salesModel = require('../../models/salesModel');

describe('MODEL - Verify sales endpoint', () => {

  describe('Should add a new Sale on dataBase', () => {
    const listOfSales = 2;
    before(() => {
      sinon.stub(connection, 'query').resolves([listOfSales]);
    });
    
    after(() => {
      connection.query.restore();
    });
  
    it('Returns an Sale Id', async () => {
      const response = await salesModel.addSale();
      expect(response).to.equal(listOfSales);
    });
  });

  describe('Should register items of the Sale on dataBase', () => {
    before(() => {
      sinon.stub(connection, 'query').returns(true);
    });
    
    after(() => {
      connection.query.restore();
    });
    
    it('When id requested exist on dataBase', async () => {
      const response = () => salesModel.addSaleProduct;
      expect(await response()).to.not.throw();
    });
  });

  describe('Should get list of sales', () => {
    const saleList = [
      {
        "id": 1,
        "date": "2022-07-02T18:20:16.000Z"
      },
      {
        "id": 2,
        "date": "2022-07-02T18:20:16.000Z"
      }
    ];

    before(() => {
      sinon.stub(connection, 'query').returns([saleList]);
    });
    
    after(() => {
      connection.query.restore();
    });
    
    it('When returns right', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.equal(saleList);
    });
  });

  describe('Should get sale by id requested', () => {
    const saleList = [
      {
        "date": "2022-07-02T22:07:46.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-07-02T22:07:46.000Z",
        "productId": 2,
        "quantity": 10
      }
    ];

      before(() => {
        sinon.stub(connection, 'query').returns([saleList]);
      });
      
      after(() => {
        connection.query.restore();
      });
      
      it('When returns right', async () => {
        const response = await salesModel.getById();
        expect(response).to.be.equal(saleList);
      });
    });

});