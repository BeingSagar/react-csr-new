/* ---- TODO: we need to move this script when we would
  have implemented bild time object conversion added */
// eslint-disable-next-line no-param-reassign, max-len
export default function flattenMessages(nestedMessages, prefix = '') { return Object.keys(nestedMessages).reduce((messages, key) => { const value = nestedMessages[key]; const prefixedKey = prefix ? `${prefix}.${key}` : key; if (typeof value === 'string') { messages[prefixedKey] = value; } else { Object.assign(messages, flattenMessages(value, prefixedKey)); } return messages; }, {}); }
