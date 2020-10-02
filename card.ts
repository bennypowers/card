import {
  LitElement,
  html,
  css,
  customElement,
  property,
  query,
  queryAssignedNodes,
  TemplateResult,
  PropertyValues,
} from 'lit-element';

import { classMap } from 'lit-html/directives/class-map';

function getParentPiercingShadowRoots(node: Node): Node {
  return (
       node instanceof ShadowRoot ? node.host
    : (node instanceof Element && node.assignedSlot || node)?.parentNode
  );
}

function isCollapseToggle(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.getAttribute('slot') === 'collapse-toggle';
}

/**
 * Simple card custom element with header and actions.
 * @slot - Content Slot.
 * @slot heading - Heading. Use an `<hgroup>` or `<h1>`, `<h2>`, etc.
 * @slot actions - Actions Footer. Use a `<menu>`
 * @csspart heading - Heading container
 * @csspart content - Content container
 * @csspart actions - Actions container
 * @cssprop [--elevation=1] - elevation coefficient
 * @cssprop [--p-card-background-elevation1=#1111] - background for 1st elevation cards
 * @cssprop [--p-card-background-elevation2=#2222] - background for 2nd elevation cards
 * @cssprop [--p-card-divider=var(--p-card-background-elevation1)] - color of heading divider
 * @cssprop [--p-card-border-radius=var(--p-card-border-radius-root, 16px) / var(--elevation, 1)]
 * @cssprop [--p-card-drop-shadow=0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)] - box-shadow
 * @cssprop --p-card-card-border - border
 * @cssprop [--p-card-heading-background-color=initial]
 * @cssprop [--p-card-border-radius-root=16px] - border-radius
 */
@customElement('p-card')
export class PCard extends LitElement {
  static readonly is = 'p-card';

  static readonly styles = [css`
    :host {
      --p-card-border-radius:
        calc(
          var(--p-card-border-radius-root, 16px) / var(--elevation, 1)
        );

      display: flex;
      flex-flow: column nowrap;
      position: relative;
      background: var(--p-card-background-elevation1, #1111);
      border: var(--p-card-border);
      border-radius: var(--p-card-border-radius);
      box-shadow:
        var(
          --p-card-drop-shadow,
          0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12)
        );
    }

    :host([horizontal]) {
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    :host([elevation="1"]) {
      --elevation: 1;
    }

    :host([elevation="2"]) {
      background: var(--p-card-background-elevation2, #2222);

      --elevation: 2;
    }

    :host([elevation="4"]) {
      --elevation: 4;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      margin: 0 0 1em 0;
      padding: 0;
    }

    hr.hasHeading {
      border-top: 1px solid var(--p-card-divider, var(--p-card-background-elevation1, #1111));
    }

    article {
      display: contents;
    }

    #content,
    #heading {
      margin: 0 24px;
    }

    #content {
      flex: 1 0 auto;
    }

    #heading {
      margin: 16px 24px;
      display: flex;
      align-content: start;
      align-items: center;
      font-size: 1.1rem;
      background-color: var(--p-card-heading-background-color, initial);
      border-top-right-radius: var(--p-card-border-radius);
      border-top-left-radius: var(--p-card-border-radius);
    }

    :host([collapsible]) #heading {
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 4px;
    }

    #heading ::slotted(h2),
    #heading ::slotted(h3),
    #heading ::slotted(h4),
    #heading ::slotted(h5),
    #heading ::slotted(h6) {
      font-size: 16px;
      margin: 0;
      margin-right: auto;
    }

    #actions ::slotted(a),
    #heading ::slotted(a) {
      color: inherit;
    }

    [slot="collapse-toggle"] svg {
      fill: currentColor;
    }

    [slot="collapse-toggle"],
    header ::slotted([slot="collapse-toggle"]) {
      color: inherit;
      border-radius: 100%;
      will-change: transform;
      width: 40px;
      height: 40px;
      margin: 4px;
    }

    #actions ::slotted(button),
    [slot="collapse-toggle"],
    header ::slotted([slot="collapse-toggle"]) {
      border: none;
      background: none;
      color: inherit;
      transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
      will-change: background;
    }

    #actions ::slotted(button) {
      font-weight: bold;
      text-transform: uppercase;
      padding: 10px 16px;
      border-radius:
        calc(
          var(--p-card-border-radius-root, 16px) / (var(--elevation, 1) * 2)
        );
    }

    [slot="collapse-toggle"]:hover,
    [slot="collapse-toggle"]:focus,
    header ::slotted([slot="collapse-toggle"]:hover),
    header ::slotted([slot="collapse-toggle"]:focus),
    #actions ::slotted(button:hover),
    #actions ::slotted(button:focus) {
      background: var(--p-card-background-elevation2, #2222);
    }

    [slot="collapse-toggle"]:active,
    header ::slotted([slot="collapse-toggle"]:active),
    #actions ::slotted(button:active) {
      background: var(--p-card-button-active, #1115);
    }

    :host([collapsed]) {
      height: min-content;
    }

    :host([collapsed]) [slot="collapse-toggle"],
    :host([collapsed]) header ::slotted([slot="collapse-toggle"]) {
      transform: rotate(180deg);
    }

    #actions {
      justify-content: flex-end;
      display: flex;
      flex-flow: row;
      margin: 16px;
      gap: 16px;
    }

    #actions ::slotted(menu) {
      list-style-type: none;
      display: contents;
      margin: 0;
      padding: 0;
    }

    #actions ::slotted(:not(:last-child)) {
      margin-right: 10px;
    }
  `];

  /**
   * Card's elevation in the DOM tree
   */
  @property({ type: Number, reflect: true }) elevation: number;

  /**
   * Whether or not the card is collapsible
   */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /**
   * If the card is collapsible, whether or not it is collapsed
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  @query('slot[name="heading"]') private headingSlot: HTMLSlotElement;

  @query('button[slot="collapse-toggle"]') private defaultCollapseToggle: HTMLButtonElement;

  @queryAssignedNodes('collapse-toggle') private collapseToggleNodes: NodeListOf<HTMLButtonElement>;

  @property({ type: Boolean })
  private get hasActions(): boolean {
    return !!this.querySelector('[slot="actions"]');
  }

  @property({ type: Boolean })
  private get hasHeading(): boolean {
    return !!this.querySelector('[slot="heading"], [slot="head-actions"]');
  }

  private mo: MutationObserver;

  private get collapseToggle() {
    return this.collapseToggleNodes?.[0] ?? null;
  }

  private get collapseTitle() {
    return this.collapsed ? 'expand' : 'collapse';
  }

  constructor() {
    super();
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.mo = new MutationObserver(this.onMutate);
    this.mo.observe(this, { childList: true });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.elevation = (
        this.hasAttribute('elevation') ? parseInt(this.getAttribute('elevation'))
      : this.guessElevationInTree()
    );
  }

  /**
   * Tries to determine the elevation of the card from its place in the DOM tree.
   */
  private guessElevationInTree(): number {
    let node = getParentPiercingShadowRoots(this);

    while (node && !(node instanceof PCard))
      node = getParentPiercingShadowRoots(node);

    const baseElevation =
      (node as PCard)?.elevation ?? 0;

    return (baseElevation === 2 ? 3 : baseElevation) + 1;
  }

  protected render(): TemplateResult {
    const { hasActions, hasHeading } = this;
    return html`
    <article>
      <header id="heading" part="heading">
        <slot name="heading"></slot>
        <slot name="head-actions"></slot>
        ${!this.collapsible ? '' : html`
        <slot name="collapse-toggle" @slotchange="${this.onCollapseToggleSlotchange}">
          <button slot="collapse-toggle" title="${this.collapseTitle}" @click="${this.toggleCollapsed}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            </svg>
          </button>
        </slot>
        `}
      </header>

      <hr part="heading-divider"
          class="${classMap({ hasHeading })}"
          ?hidden="${this.collapsible && this.collapsed}"/>

      <div id="content" part="content">
        ${!this.collapsible ? html`
        <slot></slot>
        ` : html`
        <details ?open="${!this.collapsed}">
          <summary hidden></summary>
          <slot></slot>
        </details>
        `}
      </div>

      <footer id="actions"
          class="${classMap({ hasActions })}"
          ?hidden="${this.collapsible && this.collapsed}"
          part="actions">
        <slot name="actions"></slot>
      </footer>
    </article>
    `;
  }

  protected updated(changed: PropertyValues): void {
    if (this.collapsible && changed.has('collapsed'))
      this.collapsedChanged();
  }

  private collapsedChanged() {
    if (this.collapseToggle && this.collapseToggle !== this.defaultCollapseToggle)
      this.collapseToggle.title = this.collapseTitle;
    this.dispatchEvent(new CustomEvent(this.collapsed ? 'collapse' : 'expand'));
  }

  private onCollapseToggleSlotchange(): void {
    this.collapseToggle.addEventListener('click', this.toggleCollapsed);
  }

  private onMutate(records: MutationRecord[]) {
    this.requestUpdate();
    records.forEach(record => {

      if(Array.from(record.addedNodes).some(isCollapseToggle))
          this.onCollapseToggleSlotchange();

      record.removedNodes.forEach(node => {
        if (isCollapseToggle(node))
          node.removeEventListener('click', this.toggleCollapsed);
      })
    });
  }

  /**
   * Toggles the card's collapsed state.
   */
  toggleCollapsed(): void {
    if (!this.collapsible) return;
    this.collapsed = !this.collapsed;
  }
}
