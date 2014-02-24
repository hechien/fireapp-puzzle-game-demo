(function() {
  var checkNumber, clearedBlocks, clearedNumbers, doc, drawPuzzle, firstClickBlock, matchedList, puzzleBlockAmount, puzzleBlocks, puzzleItemAmount, resetPuzzle;

  (function() {
    var _base, _ref;

    return (_ref = (_base = Array.prototype).shuffle) != null ? _ref : _base.shuffle = function() {
      var i, j, _i, _ref1, _ref2;

      for (i = _i = _ref1 = this.length - 1; _ref1 <= 1 ? _i <= 1 : _i >= 1; i = _ref1 <= 1 ? ++_i : --_i) {
        j = Math.floor(Math.random() * (i + 1));
        _ref2 = [this[j], this[i]], this[i] = _ref2[0], this[j] = _ref2[1];
      }
      return this;
    };
  })();

  puzzleBlockAmount = 16;

  puzzleItemAmount = puzzleBlockAmount / 2;

  puzzleBlocks = [];

  firstClickBlock = null;

  clearedBlocks = [];

  clearedNumbers = [];

  doc = $(document);

  matchedList = null;

  resetPuzzle = function() {
    var _i, _results;

    puzzleBlocks = (function() {
      _results = [];
      for (var _i = 1; 1 <= puzzleBlockAmount ? _i <= puzzleBlockAmount : _i >= puzzleBlockAmount; 1 <= puzzleBlockAmount ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).shuffle().slice(0, puzzleItemAmount);
    clearedNumbers = [];
    clearedBlocks = [];
    return firstClickBlock = null;
  };

  drawPuzzle = function() {
    var blocks, listItems;

    resetPuzzle();
    blocks = $('#blocks');
    listItems = blocks.children('li');
    return $(puzzleBlocks).each(function(index, number) {
      $(listItems[index]).find('span').removeClass('active matched').addClass('inactive').text(number);
      return $(listItems[index + 8]).find('span').removeClass('active matched').addClass('inactive').text(number);
    });
  };

  checkNumber = function(secondClickBlock) {
    var firstClickBlockClassList, secondClickBlockClassList, _ref;

    firstClickBlockClassList = firstClickBlock.classList;
    secondClickBlockClassList = secondClickBlock.classList;
    if (firstClickBlock.innerText !== secondClickBlock.innerText) {
      firstClickBlockClassList.remove('active');
      secondClickBlockClassList.remove('active');
      firstClickBlockClassList.add('inactive');
      secondClickBlockClassList.add('inactive');
    }
    if (firstClickBlock.innerText === secondClickBlock.innerText) {
      firstClickBlockClassList.remove('active');
      secondClickBlockClassList.remove('active');
      firstClickBlockClassList.add('matched');
      secondClickBlockClassList.add('matched');
      clearedBlocks.push([firstClickBlock, secondClickBlock]);
      clearedNumbers.push(firstClickBlock.innerText);
      $.each([firstClickBlock, secondClickBlock], function(index, item) {
        return item.innerHTML = '&nbsp;';
      });
      matchedList.text((clearedNumbers.map(function(item) {
        return item;
      })).join(', '));
    }
    return _ref = [null, null], firstClickBlock = _ref[0], secondClickBlock = _ref[1], _ref;
  };

  doc.ready(function() {
    matchedList = $('#matched');
    drawPuzzle();
    return doc.on('click', '#load-numbers', function() {
      return drawPuzzle();
    }).on('click', 'span.inactive', function() {
      $(this).removeClass('inactive').addClass('active');
      if (firstClickBlock === null) {
        firstClickBlock = this;
      }
      if (firstClickBlock !== this) {
        return checkNumber(this);
      }
    });
  });

}).call(this);
