import {
  LayoutObject,
  Layout,
  TermsOption,
  StripePaymentElement,
} from './elements/payment';
import {
  AddressMode,
  ContactOption,
  StripeAddressElement,
} from './elements/address';
import {Appearance, CssFontSource, CustomFontSource} from './elements-group';
import {StripeError} from './stripe';
import {
  StripeCurrencySelectorElement,
  FieldsOption,
  StripeElementBase,
  StripeExpressCheckoutElement,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementReadyEvent,
} from './elements';

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 */

export interface StripeCustomCheckoutElementsOptions {
  appearance?: Appearance;
  loader?: 'auto' | 'always' | 'never';
  fonts?: Array<CssFontSource | CustomFontSource>;
}

export interface StripeCustomCheckoutOptions {
  clientSecret: string;
  elementsOptions?: StripeCustomCheckoutElementsOptions;
}

/* Custom Checkout types */
export type StripeCustomCheckoutAddress = {
  country: string;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  state?: string | null;
};

export type StripeCustomCheckoutAdjustableQuantity = {
  maximum: number;
  minimum: number;
};

export type StripeCustomCheckoutBillingInterval =
  | 'day'
  | 'month'
  | 'week'
  | 'year';

export type StripeCustomCheckoutConfirmationRequirement =
  | 'phoneNumber'
  | 'shippingAddress'
  | 'billingAddress'
  | 'paymentDetails'
  | 'email';

export type StripeCustomCheckoutContact = {
  name?: string | null;
  address: StripeCustomCheckoutAddress;
};

export type StripeCustomCheckoutDeliveryEstimate = {
  maximum: StripeCustomCheckoutEstimate | null;
  minimum: StripeCustomCheckoutEstimate | null;
};

export type StripeCustomCheckoutDiscountAmount = {
  amount: number;
  displayName: string;
  promotionCode: string | null;
  recurring:
    | {type: 'forever'}
    | {type: 'repeating'; durationInMonths: number}
    | null;
};

export type StripeCustomCheckoutDueNext = {
  amountSubtotal: number;
  amountDiscount: number;
  amountTaxInclusive: number;
  amountTaxExclusive: number;
  billingCycleAnchor: number | null;
};

export type StripeCustomCheckoutEstimate = {
  unit: 'business_day' | 'day' | 'hour' | 'week' | 'month';
  value: number;
};

export type StripeCustomCheckoutLastPaymentError = {
  message: string;
};

export type StripeCustomCheckoutRedirectBehavior = 'always' | 'if_required';

export type StripeCustomCheckoutSavedPaymentMethod = {
  id: string;
  type: 'card';
  card: {
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
  };
  billingDetails: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      postal_code?: string | null;
      state?: string | null;
      country?: string | null;
    } | null;
  };
};

export type StripeCustomCheckoutTaxAmount = {
  amount: number;
  inclusive: boolean;
  displayName: string;
};

export type StripeCustomCheckoutLineItem = {
  id: string;
  name: string;
  amountDiscount: number;
  amountSubtotal: number;
  amountTaxExclusive: number;
  amountTaxInclusive: number;
  unitAmount: number;
  description: string | null;
  quantity: number;
  discountAmounts: Array<StripeCustomCheckoutDiscountAmount> | null;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
  recurring: {
    interval: StripeCustomCheckoutBillingInterval;
    intervalCount: number;
    isProrated: boolean;
    usageType: 'metered' | 'licensed';
  } | null;
  adjustableQuantity: StripeCustomCheckoutAdjustableQuantity | null;
  images: string[];
};

export type StripeCustomCheckoutRecurring = {
  interval: StripeCustomCheckoutBillingInterval;
  intervalCount: number;
  dueNext: StripeCustomCheckoutDueNext;
  trial: StripeCustomCheckoutTrial | null;
};

export type StripeCustomCheckoutShipping = {
  shippingOption: StripeCustomCheckoutShippingOption;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
};

export type StripeCustomCheckoutShippingOption = {
  id: string;
  amount: number;
  currency: string;
  displayName: string | null;
  deliveryEstimate: StripeCustomCheckoutDeliveryEstimate | null;
};

export type StripeCustomCheckoutStatus =
  | {type: 'open'}
  | {type: 'expired'}
  | {
      type: 'complete';
      paymentStatus: 'paid' | 'unpaid' | 'no_payment_required';
    };

export type StripeCustomCheckoutTaxStatus =
  | {status: 'ready'}
  | {status: 'requires_shipping_address'}
  | {status: 'requires_billing_address'};

export type StripeCustomCheckoutTotalSummary = {
  appliedBalance: number;
  balanceAppliedToNextInvoice: boolean;
  discount: number;
  shippingRate: number;
  subtotal: number;
  taxExclusive: number;
  taxInclusive: number;
  total: number;
};

export type StripeCustomCheckoutTrial = {
  trialEnd: number;
  trialPeriodDays: number;
};

export type StripeCustomCheckoutCurrencyOption = {
  amount: number;
  currency: string;
  currencyConversion?: {fxRate: number; sourceCurrency: string};
};

/* Custom Checkout session */
export interface StripeCustomCheckoutSession {
  billingAddress: StripeCustomCheckoutContact | null;
  businessName: string | null;
  canConfirm: boolean;
  confirmationRequirements: StripeCustomCheckoutConfirmationRequirement[];
  currency: string;
  currencyOptions: Array<StripeCustomCheckoutCurrencyOption> | null;
  discountAmounts: Array<StripeCustomCheckoutDiscountAmount> | null;
  email: string | null;
  id: string;
  lastPaymentError: StripeCustomCheckoutLastPaymentError | null;
  lineItems: Array<StripeCustomCheckoutLineItem>;
  livemode: boolean;
  phoneNumber: string | null;
  recurring: StripeCustomCheckoutRecurring | null;
  savedPaymentMethods: Array<StripeCustomCheckoutSavedPaymentMethod> | null;
  shipping: StripeCustomCheckoutShipping | null;
  shippingAddress: StripeCustomCheckoutContact | null;
  shippingOptions: Array<StripeCustomCheckoutShippingOption>;
  status: StripeCustomCheckoutStatus;
  tax: StripeCustomCheckoutTaxStatus;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
  total: StripeCustomCheckoutTotalSummary;
}

export type StripeCustomCheckoutResult =
  | {session: StripeCustomCheckoutSession; error?: undefined}
  | {session?: undefined; error: StripeError};

export type StripeCustomCheckoutPaymentElementOptions = {
  layout?: Layout | LayoutObject;
  paymentMethodOrder?: Array<string>;
  readonly?: boolean;
  terms?: TermsOption;
  fields?: FieldsOption;
};

export type StripeCustomCheckoutAddressElementOptions = {
  mode: AddressMode;
  contacts?: ContactOption[];
  display?: {
    name?: 'full' | 'split' | 'organization';
  };
};

export type StripeCustomCheckoutExpressCheckoutElementOptions = {
  buttonHeight: StripeExpressCheckoutElementOptions['buttonHeight'];
  buttonTheme: StripeExpressCheckoutElementOptions['buttonTheme'];
  buttonType: StripeExpressCheckoutElementOptions['buttonType'];
  layout: StripeExpressCheckoutElementOptions['layout'];
  paymentMethodOrder: StripeExpressCheckoutElementOptions['paymentMethodOrder'];
  paymentMethods: StripeExpressCheckoutElementOptions['paymentMethods'];
};

export type StripeCustomCheckoutUpdateHandler = (
  session: StripeCustomCheckoutSession
) => void;

export type StripeCustomCheckoutExpressCheckoutElementConfirmEvent = StripeExpressCheckoutElementConfirmEvent & {
  confirm: () => Promise<StripeCustomCheckoutResult>;
};

export type StripeCustomCheckoutExpressCheckoutElement = StripeElementBase & {
  /**
   * Triggered when the element is fully rendered.
   */
  on(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'ready',
    handler?: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when a buyer authorizes a payment within a supported payment method.
   */
  on(
    eventType: 'confirm',
    handler: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'confirm',
    handler: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'confirm',
    handler?: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Updates the options the `ExpressCheckoutElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update: StripeExpressCheckoutElement['update'];
};

export interface StripeCustomCheckout {
  /* Custom Checkout methods */
  applyPromotionCode: (
    promotionCode: string
  ) => Promise<StripeCustomCheckoutResult>;
  removePromotionCode: () => Promise<StripeCustomCheckoutResult>;
  updateShippingAddress: (
    shippingAddress: StripeCustomCheckoutContact | null
  ) => Promise<StripeCustomCheckoutResult>;
  updateBillingAddress: (
    billingAddress: StripeCustomCheckoutContact | null
  ) => Promise<StripeCustomCheckoutResult>;
  updatePhoneNumber: (
    phoneNumber: string
  ) => Promise<StripeCustomCheckoutResult>;
  updateEmail: (email: string) => Promise<StripeCustomCheckoutResult>;
  updateLineItemQuantity: (args: {
    lineItem: string;
    quantity: number;
  }) => Promise<StripeCustomCheckoutResult>;
  updateShippingOption: (
    shippingOption: string
  ) => Promise<StripeCustomCheckoutResult>;
  confirm: (args?: {
    returnUrl?: string;
    redirect?: StripeCustomCheckoutRedirectBehavior;
    paymentMethod?: string;
    savePaymentMethod?: boolean;
  }) => Promise<StripeCustomCheckoutResult>;
  session: () => StripeCustomCheckoutSession;
  on: (event: 'change', handler: StripeCustomCheckoutUpdateHandler) => void;

  /* Elements methods */
  changeAppearance: (appearance: Appearance) => void;
  getElement(elementType: 'payment'): StripePaymentElement | null;
  getElement(
    elementType: 'address',
    mode: AddressMode
  ): StripeAddressElement | null;
  getElement(
    elementType: 'expressCheckout'
  ): StripeCustomCheckoutExpressCheckoutElement | null;
  /* Requires beta access: Contact [Stripe support](https://support.stripe.com/) for more information. */
  getElement(
    elementType: 'currencySelector'
  ): StripeCurrencySelectorElement | null;
  createElement(
    elementType: 'payment',
    options?: StripeCustomCheckoutPaymentElementOptions
  ): StripePaymentElement;
  createElement(
    elementType: 'address',
    options: StripeCustomCheckoutAddressElementOptions
  ): StripeAddressElement;
  createElement(
    elementType: 'expressCheckout',
    options: StripeCustomCheckoutExpressCheckoutElementOptions
  ): StripeCustomCheckoutExpressCheckoutElement;
  /* Requires beta access: Contact [Stripe support](https://support.stripe.com/) for more information. */
  createElement(elementType: 'currencySelector'): StripeCurrencySelectorElement;
}
