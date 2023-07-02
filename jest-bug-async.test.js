const { log } = require("console");
// Race-condition mitigation: Unnecessary (async/await)
const SLEEP_DURATION = 0;

// Works with Async (Fail)
beforeAll(async () => {
	// vvv The only difference between both files is this line vvv
	await jest.isolateModulesAsync(async () => {
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
	await expect(mockedBug.getNumber()).resolves.toBe(0)
}, 10000)

test("Pass", () => {
	// At least 1 test needs to exist
	expect(1).toBe(1);
})
