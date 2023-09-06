#!/usr/bin/env node

const path = require("path");
const { exec } = require("child_process");
const { Command } = require("commander");
const nodemon = require("nodemon");
const chalk = require("chalk");
const {
	handleVerifyFile,
	getVersion,
	handleOptShow
} = require("../common/utils");

const program = new Command();

program
	.arguments("<file>")
	.version(getVersion())
	.description("run a TypeScript file in watch mode")
	.option("-v, --version", "print nodemon-ts version")
	.option(
		"-s, --show [string]",
		"generate and show js file and you can customize the es version, default es5"
	)

	.action((file, opt) => {
		if (!handleVerifyFile(file)) {
			return;
		}

		// start watching file
		console.log(chalk.green(`🎆🎆🎆 info: Watching file: ${file}`));

		// generate and show js file or not and customize the es version
		const { isShow, esVersion } = handleOptShow(opt.show);
		const compiler = exec(
			`tsc ${file} --watch ${isShow ? "" : "--noEmit"} --target ${esVersion}`
		);

		const absPath = path.resolve(file);
		const runner = nodemon({
			exec: `ts-node ${absPath}`,
			ignore: ["*.spec.ts"],
			watch: file
		});

		runner.on("start", () => {
			console.log(chalk.green(`🎆🎆🎆 info: Running file: ${file}`));
		});

		runner.on("restart", () => {
			console.log(chalk.green(`🎆🎆🎆 info: Restarting file: ${file}`));
		});

		process.on("SIGINT", () => {
			compiler.kill();
			runner.emit("quit");
			process.exit(0);
		});
	});

program.parse(process.argv);
