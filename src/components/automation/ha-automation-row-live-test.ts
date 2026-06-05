import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators";
import "../ha-svg-icon";
import { mdiCheck, mdiClose, mdiExclamation, mdiHelp } from "@mdi/js";

export type LiveTestState = "pass" | "fail" | "invalid" | "unknown";

/**
 * @element ha-automation-row-live-test
 *
 * @summary
 * Small status indicator dot used in automation/condition rows to surface the
 * live evaluation result.
 *
 * @attr {"pass"|"fail"|"invalid"|"unknown"} state - The current live-test state. Defaults to `unknown`.
 * @attr {string} label - Accessible label announced by assistive technology.
 */
@customElement("ha-automation-row-live-test")
export class HaAutomationRowLiveTest extends LitElement {
  @property({ reflect: true }) public state: LiveTestState = "unknown";

  @property() public label = "";

  private get _iconPath() {
    switch (this.state) {
      case "pass":
        return mdiCheck;
      case "fail":
        return mdiClose;
      case "invalid":
        return mdiExclamation;
      default:
        return mdiHelp;
    }
  }

  protected render() {
    return html`
      <div id="indicator" role="status" tabindex="0" aria-label=${this.label}>
        <ha-svg-icon .path=${this._iconPath}></ha-svg-icon>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: absolute;
      top: -5px;
      inset-inline-end: -6px;
      display: inline-block;
    }
    #indicator {
      width: 16px;
      height: 16px;
      display: grid;
      place-items: center;
      border-radius: var(--ha-border-radius-circle);
      border: var(--ha-border-width-md) solid;
      box-sizing: border-box;
      background-color: var(--card-background-color);
      color: var(--ha-color-neutral-60);
      transition: all var(--ha-animation-duration-normal) ease-in-out;
    }
    #indicator ha-svg-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
    }
    :host([state="pass"]) #indicator {
      color: var(--ha-color-green-60);
      border-color: var(--ha-color-green-60);
    }
    :host([state="fail"]) #indicator {
      color: var(--ha-color-orange-60);
      border-color: var(--ha-color-orange-60);
    }
    :host([state="invalid"]) #indicator {
      color: var(--ha-color-red-60);
      border-color: var(--ha-color-red-60);
    }
    :host([state="unknown"]) #indicator {
      color: var(--ha-color-neutral-60);
      border-color: var(--ha-color-neutral-60);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-automation-row-live-test": HaAutomationRowLiveTest;
  }
}
