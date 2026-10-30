/**
 * @typedef {'product' | 'account' | 'topup'} ItemType
 * @typedef {'Pending' | 'Payment Confirmed' | 'Processing' | 'Ready for Delivery' | 'Delivered' | 'Completed' | 'Disputed' | 'Refunded' | 'Failed' | 'Cancelled'} OrderStatus
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {ItemType} itemType
 * @property {string} itemId
 * @property {string} name
 * @property {string} image
 * @property {number} price
 * @property {number} quantity
 * @property {string} [typeLabel]
 */

/**
 * @typedef {Object} WishlistItem
 * @property {ItemType} itemType
 * @property {string} itemId
 */

/**
 * @typedef {Object} OrderLineItem
 * @property {ItemType} itemType
 * @property {string} itemId
 * @property {string} name
 * @property {string} image
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} TimelineEntry
 * @property {string} status
 * @property {string} date
 * @property {boolean} done
 * @property {boolean} [active]
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} date
 * @property {OrderStatus} status
 * @property {OrderLineItem[]} items
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} total
 * @property {string|null} coupon
 * @property {{ name: string, email: string, phone: string }} buyer
 * @property {{ address: string, city: string, country: string }} billing
 * @property {string} paymentMethod
 * @property {string} paymentStatus
 * @property {string} deliveryStatus
 * @property {string} sellerId
 * @property {TimelineEntry[]} timeline
 */

export {};
