import { pathFromArray } from "~/utils/create-resume"


/**
 * PATHS
 */
const doc = 'doc'
const examples = 'examples'
const functions = [doc, 'functions']

export const home = '/'


/**
 * --- DOCS ---
 */

export const installation = pathFromArray([doc, 'install'])
export const usage = pathFromArray([doc, 'usage'])

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