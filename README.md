# cgn-tools

Collection of utilities and constants that can be shared across all Campus Gaming Network apps.

## Scripts

https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts

`prepare` will run both BEFORE the package is packed and published, and on local npm install. Perfect for running building the code.

`prepublishOnly` will run BEFORE prepare and ONLY on `npm publish`.

`preversion` will run before bumping a new package version.

`version` will run after a new version has been bumped. If your package has a git repository, like in our case, a commit and a new version-tag will be made every time you bump a new version. This command will run BEFORE the commit is made.

`postversion` will run after the commit has been made. A perfect place for pushing the commit as well as the tag.

## Publishing to NPM

```
npm publish
```

The package will first be built by the `prepare` script, then `test` and `lint` will run by the `prepublishOnly` script before the package is published.

## Bumping a new version

```
npm version patch
```

Our `preversion`, `version`, and `postversion` will run, create a new tag in git and push it to our remote repository. Now publish again:

```
npm publish
```
