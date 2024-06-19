# 1. eslint-config-airbnb

## 1-1. eslint-config-airbnb's peer dependency

```bash
npx install-peerdeps --dev eslint-config-airbnb

# install-peerdeps v3.0.3
#$Installing peerdeps for eslint-config-airbnb@latest.
#npm install eslint-config-airbnb@19.0.4 eslint@^8.2.0 eslint-plugin-react@^7.28.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 --save-dev
```

```bash
pnpm add -D eslint-config-airbnb@19.0.4 eslint@^8.2.0 eslint-plugin-react@^7.28.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0
```

- Install all peer dependencies in order implment eslint-config-airbnb

## 1-2. apply eslint-config-airbnb

```json
//eslintrc.json
{
  "extends": ["next/core-web-vitals", "airbnb"]
}
```

- Add "airbnb" to the extends property of your eslintrc.json file.

```bash
pnpm lint
```

- Next, run the `pnpm lint` command to verify the implementation. Don't be concerned about the numerous errors; this is expected.

![alt text](<images/lint/1. numerous errors.png>)
