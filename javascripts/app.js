import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const game = new Game(canvas);

  game.run();
});
