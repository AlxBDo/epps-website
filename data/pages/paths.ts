import { pathFromArray } from "~/utils/create-resume"


/**
 * PATHS
 */
const docs = 'docs'
const examples = 'examples'
const functions = [docs, 'functions']

export const home = '/'


/**
 * --- DOCS ---
 */

export const installation = pathFromArray([docs, 'install'])
export const testing = pathFromArray([docs, 'testing'])
export const usage = pathFromArray([docs, 'usage'])

/**
 * FUNCTIONS
 */
export const defineEppsStore = pathFromArray([...functions, 'defineEppsStore'])
export const extendedState = pathFromArray([...functions, 'extendedState'])


/**
 * --- EXAMPLES ---
 */
export const lists = pathFromArray([examples, 'lists'])
export const user = pathFromArray([examples, 'user'])