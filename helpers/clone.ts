// Do not use on complex objects
// Faster than something like deep-clone
function clone(ob: any) {
  return JSON.parse(JSON.stringify(ob))
}

export { clone }
