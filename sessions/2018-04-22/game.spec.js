import game from './game';

describe('bowling game', () => {
  let myGame;
  
  describe('game', () => {
    beforeEach(() => {
      myGame = game();
    });

    it('should have roll and score method', () => {
      expect(typeof myGame.roll).toBe('function');
      expect(typeof myGame.score).toBe('function');
      expect(typeof myGame.frame).toBe('function');
    });

    it('starts with frame 1', () => {
      expect(myGame.frame().current).toBe(1);
    });

    it('should step on frame 2', () => {
      myGame.roll(0);
      myGame.roll(0);
      expect(myGame.frame().current).toBe(2);
    });

    it('should finish after ten frames when no strike and spare', () => {
      myGame.roll(0); myGame.roll(1);
      myGame.roll(2); myGame.roll(3);
      myGame.roll(4); myGame.roll(5);
      myGame.roll(0); myGame.roll(1);
      myGame.roll(2); myGame.roll(3);
      myGame.roll(4); myGame.roll(5);
      myGame.roll(0); myGame.roll(1);
      myGame.roll(2); myGame.roll(3);
      myGame.roll(4); myGame.roll(5);
      myGame.roll(0); myGame.roll(1);
      expect(myGame.frame().current).toBe(11);
      expect(myGame.score()).toBe(46);
    });

    it('should step on frame 2 when strike', () => {
      myGame.roll(10);
      expect(myGame.frame().current).toBe(2);
    });

    it('should step on frame 2 when spare', () => {
      myGame.roll(4);
      myGame.roll(6);
      expect(myGame.frame().current).toBe(2);
    });

    it('should add next 2 roll to striked frame', () => {
      myGame.roll(10);
      myGame.roll(4); myGame.roll(5);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      expect(myGame.score()).toBe(28);
    });

    it('should add next roll to spared frame', () => {
      myGame.roll(6); myGame.roll(4);
      myGame.roll(4); myGame.roll(5);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      expect(myGame.score()).toBe(23);
    });
    
    it('should count 2 more rolls if 10th frame is striked', () => {
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(10);
      myGame.roll(5); myGame.roll(4);
      expect(myGame.score()).toBe(19);
    });

    it('should count one more roll if 10th frame is spared', () => {
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(0); myGame.roll(0);
      myGame.roll(6); myGame.roll(4);
      myGame.roll(5);
      expect(myGame.score()).toBe(15);
    });
    
    it('should count 300 as max game', () => {
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10);
      myGame.roll(10); 
      expect(myGame.score()).toBe(300);
    });

    it('should be ok for a sample game', () => {
      myGame.roll(1);
      myGame.roll(4);
      myGame.roll(4);
      myGame.roll(5);
      myGame.roll(6);
      myGame.roll(4);
      myGame.roll(5);
      myGame.roll(5);
      myGame.roll(10);
      myGame.roll(0);
      myGame.roll(1);
      myGame.roll(7); 
      myGame.roll(3);
      myGame.roll(6);
      myGame.roll(4);
      myGame.roll(10);
      myGame.roll(2);
      myGame.roll(8);
      myGame.roll(6); 
      expect(myGame.score()).toBe(133);
    });

    it('should test heart break', () => {
      for (let i = 0; i < 11; i++) {
        myGame.roll(10);
      }
      myGame.roll(9);
      expect(myGame.score()).toBe(299);
    });

    it('should be ok for 10th frame spare', () => {
      for (let i = 0; i < 9; i++) {
        myGame.roll(10);
      } 
      myGame.roll(9);
      myGame.roll(1);
      myGame.roll(1);
      expect(myGame.score()).toBe(270);
    });
  });
});