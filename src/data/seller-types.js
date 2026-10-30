/**
 * @typedef {'New Seller' | 'Verified Seller' | 'Trusted Seller' | 'Top Seller'} SellerLevel
 * @typedef {'Unverified' | 'Pending' | 'Verified' | 'Rejected'} VerificationStatus
 * @typedef {'Active' | 'Draft' | 'Paused' | 'Sold Out'} ListingStatus
 * @typedef {'Pending' | 'Processing' | 'Completed' | 'Rejected'} WithdrawalStatus
 */

/**
 * @typedef {Object} SellerProfile
 * @property {string} id
 * @property {string} storeName
 * @property {string} avatar
 * @property {string} description
 * @property {string} email
 * @property {string} phone
 * @property {SellerLevel} level
 * @property {VerificationStatus} verificationStatus
 * @property {number} rating
 * @property {number} reviews
 * @property {string} joinedDate
 */

/**
 * @typedef {Object} SellerProduct
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {string} image
 * @property {ListingStatus} status
 * @property {number} stock
 * @property {number} sales
 */

/**
 * @typedef {Object} SellerAccount
 * @property {string} id
 * @property {string} gameId
 * @property {string} gameName
 * @property {string} title
 * @property {number} level
 * @property {string} rank
 * @property {string[]} rareItems
 * @property {number} price
 * @property {string} image
 * @property {ListingStatus} status
 * @property {VerificationStatus} verificationStatus
 */

/**
 * @typedef {Object} SellerOrder
 * @property {string} id
 * @property {string} itemName
 * @property {'product' | 'account'} itemType
 * @property {{ name: string, email: string }} buyer
 * @property {string} date
 * @property {number} amount
 * @property {string} status
 * @property {string} deliveryStatus
 */

/**
 * @typedef {Object} SellerEarnings
 * @property {number} totalRevenue
 * @property {number} availableBalance
 * @property {number} pendingBalance
 * @property {number} totalSales
 * @property {number} commissionRate
 * @property {number} platformFees
 */

/**
 * @typedef {Object} EarningTransaction
 * @property {string} id
 * @property {string} label
 * @property {number} amount
 * @property {'credit' | 'debit'} type
 * @property {string} date
 */

/**
 * @typedef {Object} Withdrawal
 * @property {string} id
 * @property {number} amount
 * @property {string} method
 * @property {WithdrawalStatus} status
 * @property {string} date
 */

/**
 * @typedef {{ month: string, amount: number }[]} EarningsChartData
 */

export {};
