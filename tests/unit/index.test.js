const serverList = require("../fixtures/servers");
const findServer  = require("../../index");
const utils = require("../../utils");

describe("findServer", () =>{
  it("should return server with lowest priority number amongst those online", async () =>{

    utils.sendRequest = jest.fn();
    serverList.map(server => utils.sendRequest.mockResolvedValueOnce(server))

    //assert
    expect(await findServer())
    .toMatchObject({ "priority": 1 });
  });

  it("should reject with error if servers are offline", async () => {

    utils.sendRequest = jest.fn();
    utils.sendRequest.mockRejectedValue("offline");
    
    //assert
    await expect(findServer()).rejects.toMatch("servers offline");
  })
})
