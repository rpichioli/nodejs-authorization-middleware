exports.InvalidDataException = (message) => {
	this.message = message || "Invalid data has been sent.";
}
