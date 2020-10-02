import {
  LitElement,
  html,
  customElement,
  property,
  query,
  queryAssignedNodes,
  TemplateResult,
  PropertyValues,
} from 'lit-element';

import { classMap } from 'lit-html/directives/class-map';
import style from './card.css';

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
 * @cssprop --p-card-drop-shadow - box-shadow
 * @cssprop --p-card-card-border - border
 * @cssprop [--p-card-border-radius-root=16px] - border-radius
 */
@customElement('p-card')
export class PCard extends LitElement {
  static readonly is = 'p-card';

  static readonly styles = [style];

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
