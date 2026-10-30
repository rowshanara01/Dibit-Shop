/**
 * @typedef {'Draft' | 'Pending Review' | 'Approved' | 'Rejected' | 'Suspended' | 'Out of Stock'} PublisherProductStatus
 * @typedef {'Active' | 'Paused' | 'Draft'} PublisherGameStatus
 * @typedef {'Live' | 'Disabled'} ApiKeyStatus
 * @typedef {'Active' | 'Inactive'} WebhookStatus
 */

/**
 * @typedef {Object} PublisherProfile
 * @property {string} id
 * @property {string} company
 * @property {string} name
 * @property {string} email
 * @property {string} country
 * @property {string} website
 * @property {string} logo
 * @property {string} verificationStatus
 */

/**
 * @typedef {Object} PublisherGame
 * @property {string} id
 * @property {string} name
 * @property {string} genre
 * @property {string} image
 * @property {PublisherGameStatus} status
 * @property {number} packageCount
 * @property {string} description
 */

/**
 * @typedef {Object} PublisherProduct
 * @property {string} id
 * @property {string} gameId
 * @property {string} name
 * @property {string} type
 * @property {number} price
 * @property {number} stock
 * @property {PublisherProductStatus} status
 * @property {number} sales
 */

/**
 * @typedef {Object} PublisherOrder
 * @property {string} id
 * @property {string} gameName
 * @property {string} productName
 * @property {{ name: string, email: string }} buyer
 * @property {string} date
 * @property {number} amount
 * @property {string} status
 * @property {import('./shop-types').TimelineEntry[]} timeline
 */

/**
 * @typedef {Object} PublisherApiKey
 * @property {string} id
 * @property {string} name
 * @property {string} masked
 * @property {ApiKeyStatus} status
 * @property {string} created
 * @property {string} lastUsed
 */

/**
 * @typedef {Object} PublisherWebhook
 * @property {string} id
 * @property {string} url
 * @property {string[]} events
 * @property {WebhookStatus} status
 * @property {string} created
 */

/**
 * @typedef {Object} WebhookLog
 * @property {string} id
 * @property {string} webhookId
 * @property {string} event
 * @property {string} status
 * @property {string} date
 */

export {};
