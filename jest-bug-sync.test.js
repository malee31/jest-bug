const { log } = require("console");
// Race-condition mitigation: Exists just to wait for the async function in jest.isolateModules() to resolve
const SLEEP_DURATION = 1500;

// Works with Sync (Success)
beforeAll(async () => {
	// vvv The only difference between both files is this line vvv
	jest.isolateModules(async () => {
		jest.doMock("./jest-bug-import.js");
		let mockedBug = require("./jest-bug-import.js");
		await expect(mockedBug.getNumber()).resolves.toBe(0)
		mockedBug.setNumber();
		log("Done");
	});

	await new Promise(resolve => {
		setTimeout(resolve, SLEEP_DURATION);
	});

	log("Continue");

	let mockedBug = require("./jest-bug-import.js");
	await expect(mockedBug.getNumber()).resolves.toBe(0);
}, 100000);

// At least 1 test needs to exist
test("Pass", () => {
	expect(1).toBe(1);
})
