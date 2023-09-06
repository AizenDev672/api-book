const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { STRING, UNDEFINED, COMMON_PARAMS, FILE_REG } = require("../constant");

/**
 * @description Verify that the input file is a ts/js file
 * @param fileName
 * @returns boolean
 */
const isLeagalFile = (fileName) => {
	const res = FILE_REG.test(fileName);
	if (!res) {
		console.error(chalk.red("❌❌❌ The input file must be a js/ts file"));
	}
	return res;
};

/**
 * @description Verify that the input file exists and has read and write permissions
 * @param fileName
 * @returns boolean
 */
const isFileExist = (fileName) => {
	try {
		fs.accessSync(fileName, fs.constants.R_OK | fs.constants.W_OK);
		console.log(
			chalk.green("🎆🎆🎆 info: File exists and has read/write permissions")
		);
		return true;
	} catch (err) {
		console.error(chalk.red(`❌❌❌ ${err.message}`));
		return false;
	}
};

const handleVerifyFile = (fileName) => {
	return isFileExist(fileName) && isLeagalFile(fileName);
};

/**
 * @description get version from package.json
 * @returns string
 */
const getVersion = () => {
	const packagePath = path.resolve(__dirname, "../../package.json");
	try {
		const data = fs.readFileSync(packagePath);
		const version = JSON.parse(data.toString()).version;
		return version;
	} catch (err) {
		console.error(chalk.red(`❌❌❌ ${err.message}`));
	}
};

/**
 * @description Handle parameters entered by the -s command
 * @param -s [string]
 * @returns Object { isShow: boolean, esVersion: string }
 */
const handleOptShow = (params) => {
	const typeOfParams = typeof params;
	let res = COMMON_PARAMS;

	switch (typeOfParams) {
		case UNDEFINED:
			res = {
				...res,
				isShow: false
			};
			break;
		case STRING:
			res = {
				...res,
				esVersion: params
			};

		default:
			break;
	}

	return res;
};

module.exports = {
	handleVerifyFile,
	getVersion,
	handleOptShow
};
