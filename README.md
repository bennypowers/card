# p-card

Simple card custom element with header and actions.

## Properties

| Property          | Attribute     | Type      | Default | Description                                      |
|-------------------|---------------|-----------|---------|--------------------------------------------------|
| `collapsed`       | `collapsed`   | `boolean` | false   | If the card is collapsible, whether or not it is collapsed |
| `collapsible`     | `collapsible` | `boolean` | false   | Whether or not the card is collapsible           |
| `elevation`       | `elevation`   | `number`  |         | Card's elevation in the DOM tree                 |
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

| Property                      | Default | Description   |
|-------------------------------|---------|---------------|
| `--p-card-border-radius-root` | "16px"  | border-radius |
| `--p-card-card-border`        |         | border        |
| `--p-card-drop-shadow`        |         | box-shadow    |
