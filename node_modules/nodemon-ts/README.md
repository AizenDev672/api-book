### INTRODUCTION

> The purpose of this custom command `nodemon-ts` is to allow developers to compile and excute Typescript files in real time when writing Typescript fils.You don't need to run `tsc`, `ts-node`, or `nodemon` commands anymore.The `nodemon-ts` command brings them together.

### HOW TO USE

If you are writing a Typescript file named `hello.ts` like that:

```typescript
{
	console.log("I am the output => Hello World");
}
```

then you can do that in teminal:

- `nodemon-ts hello.ts`

then you can see the following result:

```markdown
🎆🎆🎆 info: File exists and has read/write permissions
🎆🎆🎆 info: Watching file: hello.ts
🎆🎆🎆 info: Running file: hello.ts
I am the output => Hello World
```

if you edit the file again, it will automatically output the compiled file execution results:

```
🎆🎆🎆 info: Running file: hello.ts
🎆🎆🎆 info: Restarting file: hello.ts
I edit the hello.ts file again
```

**The above is the basic usage of this command, by default, the corresponding compiled js file will not be output. If you want to see the corresponding js file, you can add the `-s` parameter like that:**

- `nodemon-ts hello.ts -s` : by default, `es5` rules are used to output js files

In addition to, you can customize the es version, like `es2015`, `esnext` and so on

- `nodemon-ts hello.ts -s es2015`

[github地址](https://github.com/luckydog12/nodemon-ts)
