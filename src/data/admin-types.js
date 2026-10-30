/**
 * @typedef {'buyer' | 'seller' | 'publisher' | 'admin'} UserRole
 * @typedef {'Active' | 'Suspended' | 'Pending'} UserStatus
 * @typedef {'Pending' | 'Approved' | 'Rejected' | 'Suspended'} ReviewStatus
 * @typedef {'Open' | 'Under Review' | 'Refunded' | 'Released' | 'Rejected'} DisputeStatus
 * @typedef {'product' | 'account' | 'game'} CatalogKind
 */

/**
 * @typedef {Object} AdminUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {UserStatus} status
 * @property {string} joined
 */

/**
 * @typedef {Object} AdminSeller
 * @property {string} id
 * @property {string} storeName
 * @property {string} email
 * @property {ReviewStatus} verification
 * @property {string} level
 * @property {number} rating
 * @property {number} products
 * @property {number} orders
 * @property {number} sales
 */

/**
 * @typedef {Object} AdminPublisher
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {ReviewStatus} verification
 * @property {number} games
 * @property {number} products
 * @property {number} orders
 * @property {number} revenue
 */

/**
 * @typedef {Object} AdminCatalogItem
 * @property {string} id
 * @property {CatalogKind} kind
 * @property {string} name
 * @property {string} owner
 * @property {string} ownerType
 * @property {ReviewStatus} approval
 * @property {boolean} featured
 * @property {number} price
 * @property {string} status
 */

/**
 * @typedef {Object} AdminDispute
 * @property {string} id
 * @property {string} orderId
 * @property {string} buyer
 * @property {string} seller
 * @property {string} reason
 * @property {DisputeStatus} status
 * @property {string} date
 * @property {string} evidence
 */

/**
 * @typedef {Object} AdminSettings
 * @property {number} sellerCommission
 * @property {number} publisherMarkup
 * @property {boolean} marketplaceLive
 * @property {boolean} newListingsNeedReview
 * @property {boolean} emailAlerts
 * @property {boolean} twoFactorRequired
 * @property {boolean} auditLog
 */

export {};
