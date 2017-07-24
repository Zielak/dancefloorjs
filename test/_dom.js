import jsdom from 'jsdom'
const { JSDOM } = jsdom

export const document = new JSDOM('<!doctype html><html><body></body></html>')
export const window = document.parentWindow
