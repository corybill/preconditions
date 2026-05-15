import Chance from "chance";

const chance = new Chance();

export default {
  uniqueId() {
    return chance.hash({ length: 24 });
  },
  zip() {
    return chance.zip();
  },
  firstName() {
    return chance.first();
  },
  lastName() {
    return chance.last();
  },
  word(len) {
    return chance.word({ length: len || 5 });
  },
  sentence(len) {
    return chance.sentence({ words: len || 5 });
  },
  date() {
    return chance.date();
  }
};
