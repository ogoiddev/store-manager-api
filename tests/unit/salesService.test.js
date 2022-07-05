const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');
const productsModel = require('../../models/productsModel');
// const { rightSaleBody } = require('../../__tests__/_dataMock.js');

describe('SERVICE - Verify sales endpoint', () => {

  describe('Should send a request to add an Sale. Check ProductId, register sale and receive Id Sale and then register Items List', () => {
    const response = {};
    const request = [{}, {}];
    const idSale = 2;

    before(() => {
      response.status = sinon.stub().returns(response);
      request.status = sinon.stub().returns(request);

      sinon.stub(salesModel, 'addSale').returns(idSale);
      sinon.stub(salesModel, 'addSaleProduct').resolves(true);
      sinon.stub(productsModel, 'getById').resolves(true);
    });
    
    after(() => {
      salesModel.addSale.restore();
      salesModel.addSaleProduct.restore();
    });
  
    it('Validate Sale list and receive Id Sale', async () => {
      const response = () => salesService.addSale;
      expect(await response()).to.not.throw();
    });
  });

  describe('Should receive a Sale List', () => {
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
        sinon.stub(salesModel, 'getAll').returns(saleList);
      });
      
      after(() => {
        salesModel.getAll.restore();
      });
      
      it('When returns right', async () => {
        const response = await salesService.getAll();
        expect(response).to.be.equal(saleList);
      });
    });

});