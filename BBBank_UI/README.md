# Data Visualization in Angular using ChartJS

### What is Linting?
Linting is the automated checking of source code for programmatic and stylistic errors. This is done by using a lint tool (otherwise known as linter). A lint tool is a basic static code analyzer, we will be using [ESLint](https://dev.to/shivambmgupta/eslint-what-why-when-how-5f1d "ESLint").

### Why Linting?
Linting is important to reduce errors and improve the overall code quality. Using lint tools can help you accelerate development and reduce costs by finding errors earlier.

Linting is important in order to maintain consistent code style, prevent code cruft (e.g. unused local variables or unreachable code) and more complex rules like performance optimizations when there are multiple ways to achieve the same result.

It also ensures, writing the code efficiently and consistently across the teams.

Companies using ESLint in their tech stacks, includes **Udemy**, **Airbnb** and **Asana** etc.


### About this exercise
Previously we have 
- Scaffolded a newly angular application
- Install Bootstrap and FontAwesome
- Integrated bootstrap Navbar component

In this lab we will
- Install ESLint.
- Set up AirBnB ESLint Dependencies
- Fix Lint errors automatically
- Install ESLint Extension
- Fix Lint errors manually

------------


#### Step 1: Installing ESLint
First we will install ESLint in our project, by running the following command

```typescript
ng lint
```
The terminal will ask for installing the ESLint package, We will select `Yes` 

The file `.eslintrc.json` is also generated at the root level of the project after the ESlint is installed. This is the configuration file for ESLint. It defines the configuration structure.

For available linting rules please visit [here](https://eslint.org/docs/rules/ "here")


#### Step 2: Setting up AirBnB ESLint Dependencies
Install the correct versions of each package, which are listed by the command:

```typescript
npm info "eslint-config-airbnb-base@latest" peerDependencies
```
![esLINT_airBnB_Dependencies](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/esLINT_airBnB_Depndencies.png)

As we can see, currently there are two Dependencies and we have already installed `eslint`, Now we will install the `eslint-plugin-import` by using the following command

```typescript
npm i -D eslint-config-airbnb-base eslint-plugin-import
```
If any issues and vulnerabilities arises, run the following command to fix all of them.

```typescript
npm audit fix
```

#### Step 3: Configure ESLint AirBnB base for Typescript
Within ESLint config file i.e `.eslintrc.json`  there is an array named `"extends" : [ ]` Add `airbnb-base` in the array to tell from where the linting rules are being matched

```typescript
extends: [
"plugin:@angular-eslint/recommended",
"plugin:@angular-eslint/template/process-inline-templates",
"airbnb-base",
]
```
As, the `airbnb-base` rule is only for Javascript, So for Typescript support there is another package, To install that run the following command

```typescript
npm i -D eslint-config-airbnb-typescript
```
After that, add the following content in the `"extends" : [ ]` array
```typescript
extends: [
"plugin:@angular-eslint/recommended",
"plugin:@angular-eslint/template/process-inline-templates",
"airbnb-base",
"airbnb-typescript/base"
]
```


#### Step 4: Fix Lint errors Automatically

Run the following command to see all the lint errors.

```typescript
ng lint
```
![Linting errors list](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/Linting_erros_list.png)

As we can in the above image, we have 262 Errors (261 errors and 1 warning), Lets run the following command to fix these errors automatically

```typescript
ng lint --fix
```
![Linting errors list after autofix](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/Linting_errors_list_after_autofix.png)

After running the command we are only left with 15 errors and 1 warning, which we will solve manually in the coming steps....

#### Step 5: Installing ESLint Extension
Install the ESLint extension by Microsoft for VS Code to highlight Lint erros in our project file easily.

Reload the VS Code after installing the extension.

![ESLint Extension](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/ESLint_Extension.png)

#### Step 6: Fix Lint Errors Manually
Now again run the `ng lint` command to get list of all errors. We can see that wherever we have lint error, it is being highlighted, it is due to ESLint extension. Also we can resolve the error with this extension.

Now, we will go line by line and remove all the errors after after getting the list and location of all errors.

- ##### Removing Prefer default export error
The first error we are going to remove is Prefer default export from all the files as listed, but here we are going to show it for `app-routing.module.ts` only.

Click on the underlined line in the file and press **Ctrl + .**  then select **Convert default export to named export** to fix the error as shown in the below image. Similar we will go thorough each file and fix that error wherever this error is.

![Prefer_default export_error](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/Prefer_default_export_error.gif)

- ##### Disable max length on entire file
In the `polyfills.ts` there is maximum length error, will remove that error for entire file.

![Prefer_default export_error](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/Prefer_default_export_error.gif)


- ##### No Empty Lifecycle Method
In the `toolbar.component.ts` we have empty lifecycle method, so we should not only remove empty lifecycle method from this file but from all files wherever this error is.

![No_Empty_Lifecycle_Method](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/No_Empty_Lifecycle_Method.gif)


- ##### No Useless Constructor and Blank Lines
In the `toolbar.component.ts` we have an useless constructor, so we should not only remove that useless constructor from this file but from all files wherever this error is.

![No_Empty_Lifecycle_Method](https://github.com/PatternsTechGit/PT_Linting/blob/main/Readme-images/No_Useless_Constructor.gif)


So after going through line by line and resolving all error line by line, again run the `ng lint` command and we can see there are no error anymore.
