// Auth
export const COLLECTION_AUTH_ACCOUNTS = 'accounts'
export const COLLECTION_AUTH_SESSIONS = 'sessions'
export const COLLECTION_AUTH_USERS = 'users'
export const COLLECTION_AUTH_VERIFICATION_TOKENS = 'verification_tokens'

export const INDEX_AUTH_ACCOUNT_BY_PROVIDER_AND_PROVIDER_ACCOUNT_ID = 'account_by_provider_and_provider_account_id'
export const INDEX_AUTH_SESSION_BY_SESSION_TOKEN = 'session_by_session_token'
export const INDEX_AUTH_USER_BY_EMAIL = 'user_by_email'
export const INDEX_VERIFICATION_TOKEN_BY_IDENTIFIER_AND_TOKEN = 'verification_token_by_identifier_and_token'

// Invoices
export const COLLECTION_INVOICES = 'Invoices'
export const INDEX_INVOICES_BY_OWNER_ID = 'Invoices_By_OwnerID'
export const INDEX_INVOICE_BY_INVOICE_CODE = 'Invoice_By_InvoiceCode'

// Webhooks
export const COLLECTION_WEBHOOKS = 'Webhooks'
export const INDEX_WEBHOOK_EVENTS_BY_INVOICE_CODE = 'WebhookEvents_By_InvoiceCode'