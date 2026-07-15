# Button
Primary tappable action. Use `variant="primary"` (sunset coral) for the main CTA, `ghost`/`subtle` for secondary, `apple` for Apple Pay.

```jsx
<Button onClick={join}>Join now</Button>
<Button variant="ghost" full={false}>Enter for a spot</Button>
```
Props: variant, size (sm/md/lg), full (default true), disabled, leadingIcon, trailingIcon.