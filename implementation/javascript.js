// from <https://github.com/tc39/proposal-compare-strings-by-codepoint?tab=readme-ov-file#manual-iteration>
String.codePointCompare = (left, right) => {
  const leftIter = left[Symbol.iterator]()
  const rightIter = right[Symbol.iterator]()
  for (;;) {
    const { value: leftChar } = leftIter.next()
    const { value: rightChar } = rightIter.next()
    if (leftChar === undefined && rightChar === undefined) {
      return 0
    } else if (leftChar === undefined) {
      // left is a prefix of right.
      return -1
    } else if (rightChar === undefined) {
      // right is a prefix of left.
      return 1
    }
    const leftCodepoint = leftChar.codePointAt(0)
    const rightCodepoint = rightChar.codePointAt(0)
    if (leftCodepoint < rightCodepoint) return -1
    if (leftCodepoint > rightCodepoint) return 1
  }
}

import crypto from "crypto"
import fs from "fs"

const { subjects, objects, predicate, negativity } = JSON.parse(fs.readFileSync(0, 'utf-8'))
subjects.sort(String.codePointCompare)
objects.sort(String.codePointCompare)

const str = [subjects.join("|"), predicate, objects.join("|")].join(" ")
const bytes = new TextEncoder().encode(str)
const digest = crypto.createHash('sha256').update(Buffer.from(bytes)).digest("hex")
  
console.log(`mapping:${negativity ? "~" : ""}${digest}`)
