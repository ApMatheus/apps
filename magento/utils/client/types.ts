export interface Cart {
  id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_virtual: boolean;
  items: unknown[];
  items_count: number;
  items_qty: number;
  customer: {
    email: string | null;
    firstname: string | null;
    lastname: string | null;
  };
  billing_address: {
    id: number;
    region: string | null;
    region_id: string | null;
    region_code: string | null;
    country_id: string | null;
    street: string[];
    telephone: string | null;
    postcode: string | null;
    city: string | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    same_as_billing: number;
    save_in_address_book: number;
  };
  orig_order_id: number;
  currency: {
    global_currency_code: string;
    base_currency_code: string;
    store_currency_code: string;
    quote_currency_code: string;
    store_to_base_rate: number;
    store_to_quote_rate: number;
    base_to_global_rate: number;
    base_to_quote_rate: number;
  };
  customer_is_guest: boolean;
  customer_note_notify: boolean;
  customer_tax_class_id: number;
  store_id: number;
  extension_attributes: {
    shipping_assignments: unknown[];
    negotiable_quote: {
      quote_id: number | null;
      is_regular_quote: boolean | null;
      status: string | null;
      negotiated_price_type: string | null;
      negotiated_price_value: number | null;
      shipping_price: number | null;
      quote_name: string | null;
      expiration_period: string | null;
      email_notification_status: number | null;
      has_unconfirmed_changes: boolean | null;
      is_shipping_tax_changed: boolean | null;
      is_customer_price_changed: boolean | null;
      notifications: string | null;
      applied_rule_ids: string | null;
      is_address_draft: boolean | null;
      deleted_sku: string | null;
      creator_id: number | null;
      creator_type: string | null;
    };
  };
}
