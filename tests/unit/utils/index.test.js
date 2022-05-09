const serverList = require("../../fixtures/servers");
const utils = require("../../../utils");

describe("getLowestPriority", () => {
  it("should return item with smallest priority number", 
   () => {
    const list = [{priority: 1}, {priority: 2}];
    const result = utils.getLowestPriority(list);

    expect(result).toMatchObject({priority: 1})
  })
});

describe("sendRequest", () => {
  it("should resolve if statusCode is between 200 - 299", 
   async () => {

    utils.getStatusCode = jest.fn();
    utils.getStatusCode.mockResolvedValue(200);

    // assert
    const result = await utils.sendRequest(serverList[0])
    expect(result).toMatchObject(serverList[0])
  });


  it("should reject with status code not between 200 - 299",
   async () => {
    utils.getStatusCode = jest.fn();
    utils.getStatusCode.mockResolvedValue(300);

    //assert
    await expect(utils.sendRequest(serverList[0]))
      .rejects.toMatch("offline");
  })
});