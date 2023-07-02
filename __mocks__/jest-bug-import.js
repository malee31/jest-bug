let number = 0;

async function setNumber() {
	number = 100;
}

async function getNumber() {
	return number;
}

module.exports = {
	setNumber,
	getNumber
};