# p-card

## Example

```html
<p-card>
  <h2 slot="heading">A card!</h2>
  <p>Has any content you want</p>
  <button slot="actions">As well as action buttons</button>
</p-card>
```

## Properties

| Property      | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| `collapsed`   | `boolean` | If the card is collapsible, whether or not it is collapsed |
| `collapsible` | `boolean` | Whether or not the card is collapsible           |
| `elevation`   | `number`  | Card's elevation in the DOM tree                 |

## Methods

| Method            | Type       | Description                         |
|-------------------|------------|-------------------------------------|
| `toggleCollapsed` | `(): void` | Toggles the card's collapsed state. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Content Slot.                                    |
| `actions` | Actions Footer. Use a `<menu>`                   |
| `heading` | Heading. Use an `<hgroup>` or `<h1>`, `<h2>`, etc. |

## CSS Shadow Parts

| Part      | Description       |
|-----------|-------------------|
| `actions` | Actions container |
| `content` | Content container |
| `heading` | Heading container |

## CSS Custom Properties

| Property                            | Default                                          | Description                        |
|-------------------------------------|--------------------------------------------------|------------------------------------|
| `--elevation`                       | 1                                                | elevation coefficient              |
| `--p-card-background-elevation1`    | "#1111"                                          | background for 1st elevation cards |
| `--p-card-background-elevation2`    | "#2222"                                          | background for 2nd elevation cards |
| `--p-card-border-radius`            | "var(--p-card-border-radius-root, 16px) / var(--elevation, 1)" |                                    |
| `--p-card-border-radius-root`       | "16px"                                           | border-radius                      |
| `--p-card-card-border`              |                                                  | border                             |
| `--p-card-divider`                  | "var(--p-card-background-elevation1)"            | color of heading divider           |
| `--p-card-drop-shadow`              | "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" | box-shadow                         |
| `--p-card-heading-background-color` | "initial"                                        |                                    |


# p-card

## Example

```html
<p-card>
  <h2 slot="heading">A card!</h2>
  <p>Has any content you want</p>
  <button slot="actions">As well as action buttons</button>
</p-card>
```

## Properties

| Property          | Attribute     | Type      | Default | Description                                      |
|-------------------|---------------|-----------|---------|--------------------------------------------------|
| `collapsed`       | `collapsed`   | `boolean` | false   | If the card is collapsible, whether or not it is collapsed |
| `collapsible`     | `collapsible` | `boolean` | false   | Whether or not the card is collapsible           |
| `elevation`       | `elevation`   | `number`  |         | Card's elevation in the DOM tree                 |
| `onMutate`        |               |           |         |                                                  |
| `toggleCollapsed` |               |           |         |                                                  |

## Methods

| Method            | Type       | Description                         |
|-------------------|------------|-------------------------------------|
| `toggleCollapsed` | `(): void` | Toggles the card's collapsed state. |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | Content Slot.                                    |
| `actions` | Actions Footer. Use a `<menu>`                   |
| `heading` | Heading. Use an `<hgroup>` or `<h1>`, `<h2>`, etc. |

## CSS Shadow Parts

| Part      | Description       |
|-----------|-------------------|
| `actions` | Actions container |
| `content` | Content container |
| `heading` | Heading container |

## CSS Custom Properties

| Property                            | Default                                          | Description                        |
|-------------------------------------|--------------------------------------------------|------------------------------------|
| `--elevation`                       | 1                                                | elevation coefficient              |
| `--p-card-background-elevation1`    | "#1111"                                          | background for 1st elevation cards |
| `--p-card-background-elevation2`    | "#2222"                                          | background for 2nd elevation cards |
| `--p-card-border-radius`            | "var(--p-card-border-radius-root, 16px) / var(--elevation, 1)" |                                    |
| `--p-card-border-radius-root`       | "16px"                                           | border-radius                      |
| `--p-card-card-border`              |                                                  | border                             |
| `--p-card-divider`                  | "var(--p-card-background-elevation1)"            | color of heading divider           |
| `--p-card-drop-shadow`              | "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" | box-shadow                         |
| `--p-card-heading-background-color` | "initial"                                        |                                    |
