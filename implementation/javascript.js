import crypto from "crypto"
import fs from "fs"

const { subjects, objects, predicate, negativity } = JSON.parse(fs.readFileSync(0, 'utf-8'))
subjects.sort(String.codePointCompare)
objects.sort(String.codePointCompare)

const str = [subjects.join("|"), predicate, objects.join("|")].join(" ")
const bytes = new TextEncoder().encode(str)
const digest = crypto.createHash('sha256').update(Buffer.from(bytes)).digest("hex")
  
console.log(`mapping:${digest}${negativity ? "~" : ""}`)
