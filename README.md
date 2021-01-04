# Supabase UI

## Using Supabase UI

_Please note, Supabase UI is still a work-in-progress until a major release is published_

Install the NPM package

```cli
npm install @supabase/ui
```

Example of importing a component

```js
@import { Button } from '@supabase/ui'

//...

return (
  <Button>I am a Supabase UI button</Button>
)
```

## Run storybook locally

Supabase UI uses storybook to develop and organise components.
They can be viewed locally in the Storybook docs explorer

make sure you are in the supabase-ui folder

```cli
cd supabase-ui
```

run storybook

```cli
npm run storybook
```

(you may need to run `npm install` first)

Storybook runs by default on `http://localhost:6006/`

## Local Development

If you want to test Supabase UI components locally, in context in another project locally, then you will need to `npm link` the supabase-ui project locally.

Follow these instructions here -> 
[NPM Linking and Unlinking instructions](https://dev.to/erinbush/npm-linking-and-unlinking-2h1g)

### Common issues

*A common issue found with local testing is multiple versions of react running.*

You may need to npm-link the react node module in the target app you want to locally test the library in. Then use that version of react inside the library, and then npm-link the library so the target app can use the library with just the 1 version of react.

Step by step:

• run npm link in /your-app/node_modules/react. This should make the React's global link.

• run npm link react in /supabase/ui. This should make the library use the application’s React copy.

• run npm link @supabase/ui in /your-app