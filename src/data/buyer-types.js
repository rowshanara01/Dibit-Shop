/**
 * @typedef {'Open' | 'In Progress' | 'Resolved' | 'Closed'} TicketStatus
 * @typedef {'Payment' | 'Top-Up' | 'Account Purchase' | 'Refund' | 'Other'} TicketCategory
 * @typedef {'credit' | 'debit'} TransactionType
 * @typedef {'Completed' | 'Pending' | 'Failed'} TransactionStatus
 * @typedef {'order' | 'payment' | 'delivery' | 'promotion'} NotificationType
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} avatar
 * @property {{ orderUpdates: boolean, promotions: boolean, deliveryAlerts: boolean }} preferences
 */

/**
 * @typedef {Object} WalletTransaction
 * @property {string} id
 * @property {TransactionType} type
 * @property {number} amount
 * @property {TransactionStatus} status
 * @property {string} date
 * @property {string} label
 */

/**
 * @typedef {Object} Purchase
 * @property {string} id
 * @property {string} orderId
 * @property {import('./shop-types').ItemType} itemType
 * @property {string} itemId
 * @property {string} name
 * @property {string} image
 * @property {string} date
 * @property {string} status
 */

/**
 * @typedef {Object} TicketMessage
 * @property {string} id
 * @property {'user' | 'support'} from
 * @property {string} text
 * @property {string} date
 */

/**
 * @typedef {Object} SupportTicket
 * @property {string} id
 * @property {string} subject
 * @property {TicketCategory} category
 * @property {TicketStatus} status
 * @property {string} date
 * @property {string} description
 * @property {TicketMessage[]} messages
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {NotificationType} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {string} date
 * @property {string} [href]
 */

export {};
