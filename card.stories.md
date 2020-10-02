```js script
import './card';
import '@material/mwc-button';
import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-textfield';
import { html } from '@open-wc/demoing-storybook';

export default {
  title: 'Design System/Atoms/Card',
  component: 'nnrg-card',
  parameters: {
    options: { selectedPanel: 'storybookjs/docs/panel' }
  }
}
```

# Card

A Card contains a heading, some content, and optionally actions.

```html story
  <nnrg-card id="simple-card">
    <h3 slot="heading">Card Heading</h3>

    <p>
      Card Content is slotted in from outside. It can contain arbitrary content
    </p>

    <style>
    #simple-card pre {
      color: rebeccapurple;
    }
    </style>

    <pre>It can be styled from the light DOM</pre>

    <img src="https://www.fillmurray.com/100/150" alt="A portrait of Bill Murray"/>
  </nnrg-card>
```

This card has two actions, one to set the font weight to bold, and one to unset it.

```js story
export const WithActions = () => {
  const setFontWeight = ({ target: { dataset: { weight } } }) =>
    document.querySelector('#action-card p')
      .style
      .fontWeight = weight;

  return html`
    <nnrg-card id="action-card">
      <h3 slot="heading">Card with Actions</h3>

      <p style="transition: font-weight 0.3s ease-in">
        A card that has actions typically has between one and three buttons.
        Those actions should be related to the content of the card.
        For example, "Read More" for a card that displays the summary of an entity
        Or "Buy Now" for a card that displays a product.
      </p>

      <menu slot="actions">
        <mwc-button data-weight="initial" @click="${setFontWeight}">
          Gotcha
        </mwc-button>

        <mwc-button data-weight="bolder" @click="${setFontWeight}">
          Come Again?
        </mwc-button>
      </menu>

    </nnrg-card>
  `;
}
```

## Tabbed Cards

Cards may have tabs

```html story
<nnrg-card type="tabbed">
  <mwc-tab-bar slot="heading">
    <mwc-tab label="First Tab"></mwc-tab>
    <mwc-tab label="Second Tab"></mwc-tab>
    <mwc-tab label="Third Tab"></mwc-tab>
  </mwc-tab-bar>
  Here's some content
</nnrg-card>
```

## Elevation

Cards can contain other cards, in those cases, set the `elevation` attribute to 2 or 4.

```html story
<nnrg-card>
  <h3 slot="heading">First-Level Card</h3>
  <nnrg-card elevation="2">
    <h4 slot="heading">Second-Level Card</h4>
    <mwc-button slot="actions" label="second-level action" raised></mwc-button>
  </nnrg-card>
  <mwc-button slot="actions" label="first-level action" raised></mwc-button>
</nnrg-card>
```

Cards will also automatically infer their elevation based on the position in the DOM tree.
This works across shadow-roots and slots, as well.

```html story
<nnrg-card>
  <h3 slot="heading">First-Level Card</h3>
  <nnrg-card>
    <h4 slot="heading">Second-Level Card</h4>
    <mwc-button slot="actions" label="second-level action" raised></mwc-button>
  </nnrg-card>
  <mwc-button slot="actions" label="first-level action" raised></mwc-button>
</nnrg-card>
```

<sb-props of="nnrg-card"></sb-props>
