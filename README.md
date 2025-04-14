# API hook

### Status

[![Publish package to NPM](https://github.com/LarsSK06/api-hook/actions/workflows/publish.yaml/badge.svg)](https://github.com/LarsSK06/api-hook/actions/workflows/npm-publish.yaml)

### What is this?

This is my own personal and preferred API hook made myself for React. This is mainly made to prevent redundancy and version obsolescence across my own projects.


### Why was this created?

To prevent writing the same code across all my projects, as well as keeping the scripts up to date.

### How to use?

1. Wrap project in the context provider from the package.
2. Create a configuration. This can be done by either satisfying the `Config` interface/type, and applying it as a prop to the provider, or using the `createConfig` function, which returns an object of type `Config`, which you again apply as a prop.
3. Use `useApi` with type parameters to take use of the package/hook.