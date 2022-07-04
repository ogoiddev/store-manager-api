const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../services/salesService');
const salesController = require('../../controllers/salesController');

describe('SERVICE - Verify sales endpoint', () => {

  describe('Should send a request to add an Sale. Check ProductId, register sale and receive Id Sale and then register Items List', () => {
    const response = {};
    const request = { body: [{}, {}] };
    const next = () => { };

      before(() => {
        response.status = sinon.stub().returns(response);

        sinon.stub(salesService, 'addSale').resolves(true);
      });
      
      after(() => {
        salesService.addSale.restore();
      });
    
      it('When returns status 200', async () => {
        await salesController.addSale(request, response, next);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
    });

  describe('Should receive a Sale List', () => {
    const response = {};
    const request = {};
    const next = () => { };

      before(() => {
        response.status = sinon.stub().returns(response);
        
        sinon.stub(salesService, 'getAll').resolves(true);
      });
        
      after(() => {
        salesService.getAll.restore();
      });
        
      it('When returns right', async () => {
        await salesController.getAll(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });

});