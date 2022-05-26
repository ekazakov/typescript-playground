import { add, ofUSD, ofEUR } from "./opaque-defeniton";

const u1 = ofUSD(1);
const u2 = ofUSD(2);
let u3 = ofUSD(0);

const e1 = ofEUR(1);

u3 = add(u1, u2);
console.log("u3:", u3);
