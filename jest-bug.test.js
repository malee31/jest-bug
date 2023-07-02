// Toggle this to true to show bug
const USE_ASYNC = !true;

// Exists just to wait for the async function in synchronous to complete
const SLEEP_DURATION = 1500;

// 10s test timeout for good measure
if(USE_ASYNC) {
	// Works with Async
	beforeAll(async () => {
		await jest.isolateModulesAsync(async () => {
			jest.mock("./jest-bug-import.js");
			let mockedBug = require("./jest-bug-import.js");
			await expect(mockedBug.getNumber()).resolves.toBe(0)
			mockedBug.setNumber();
		});

		// jest.mock("./jest-bug-import.js");
		let mockedBug = require("./jest-bug-import.js");
		await expect(mockedBug.getNumber()).resolves.toBe(0)
	}, 10000)
} else if(!USE_ASYNC) {
	// Works with Sync
	beforeAll(async () => {
		jest.isolateModules(async () => {
			jest.mock("./jest-bug-import.js");
			let mockedBug = require("./jest-bug-import.js");
			await expect(mockedBug.getNumber()).resolves.toBe(0)
			mockedBug.setNumber();
		});

		await new Promise(resolve => {
			setTimeout(resolve, SLEEP_DURATION);
		});

		let mockedBug = require("./jest-bug-import.js");
		await expect(mockedBug.getNumber()).resolves.toBe(0);
	}, 10000)
}

test("Pass", () => {
	// At least 1 test needs to exist
	expect(1).toBe(1);
})