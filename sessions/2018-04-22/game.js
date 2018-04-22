const strike = 10;

const last = (xs, backward = -1) => xs[xs.length + backward];

const isStrike = (rolls, offset) => {
  return last(rolls, offset) !== undefined && last(rolls, offset) === strike;
}

const isPrevSpare = rolls =>
  last(rolls, -1) &&
  last(rolls, -2) &&
  last(rolls, -1) + last(rolls, -2) === strike;

const game = () => {
  let rolls = [];
  let total = 0;
  let currentFrame = 1;
  let firstRollInFrame = true;

  return {
    roll(pin) {
      if (currentFrame <= 10) {
        total += pin;
      }

      if (firstRollInFrame) {
        if (isStrike(rolls, -1) && currentFrame <= 11) {
          total += pin;
        }
        if (isStrike(rolls, -2)) {
          total += pin;
        }
        if (isPrevSpare(rolls)) {
          total += pin;
        }
        if (pin === strike) {
          currentFrame++;
        } else {
          firstRollInFrame = false;
        } 
      } else {
        if (isStrike(rolls, -2)) {
          total += pin;
        }
        firstRollInFrame = true;
        currentFrame++;
      }
      rolls.push(pin);
    },
    score() {
      return total;
    },
    frame() {
      return {
        current: currentFrame,
      };
    }
  };
};
module.exports = game;