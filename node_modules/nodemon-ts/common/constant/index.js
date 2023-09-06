const BOOLEAN = "boolean";
const STRING = "string";
const UNDEFINED = "undefined";

const ES_5 = "es5";

const COMMON_PARAMS = {
	isShow: true,
	esVersion: ES_5
};

// regexp
const FILE_REG = new RegExp(".(js|ts)$");

module.exports = {
	BOOLEAN,
	STRING,
	ES_5,
	COMMON_PARAMS,
	UNDEFINED,
	FILE_REG
};
