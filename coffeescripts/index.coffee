do -> Array::shuffle ?= ->
  for i in [@length-1..1]
    j = Math.floor Math.random() * (i + 1)
    [@[i], @[j]] = [@[j], @[i]]
  @

puzzleBlockAmount = 16
puzzleItemAmount  = puzzleBlockAmount / 2
puzzleBlocks = []
firstClickBlock = null
clearedBlocks  = []
clearedNumbers = []
doc = $(document)
matchedList = null

resetPuzzle = ->
  puzzleBlocks = [1..puzzleBlockAmount].shuffle()[0...puzzleItemAmount]
  clearedNumbers = []
  clearedBlocks = []
  firstClickBlock = null

drawPuzzle  = ->
  resetPuzzle()
  blocks = $('#blocks')
  listItems = blocks.children('li')
  $(puzzleBlocks).each (index, number) ->
    $(listItems[index]).find('span').removeClass('active matched').addClass('inactive').text(number)
    $(listItems[index + 8]).find('span').removeClass('active matched').addClass('inactive').text(number)

checkNumber = (secondClickBlock) ->
  firstClickBlockClassList  = firstClickBlock.classList
  secondClickBlockClassList = secondClickBlock.classList

  if firstClickBlock.innerText isnt secondClickBlock.innerText
    firstClickBlockClassList.remove('active')
    secondClickBlockClassList.remove('active')

    firstClickBlockClassList.add('inactive')
    secondClickBlockClassList.add('inactive')

  if firstClickBlock.innerText is secondClickBlock.innerText
    firstClickBlockClassList.remove('active')
    secondClickBlockClassList.remove('active')
    firstClickBlockClassList.add('matched')
    secondClickBlockClassList.add('matched')
    clearedBlocks.push [firstClickBlock, secondClickBlock]
    clearedNumbers.push firstClickBlock.innerText
    $.each [firstClickBlock, secondClickBlock], (index, item) -> item.innerHTML = '&nbsp;'
    matchedList.text (clearedNumbers.map (item) -> item).join ', '

  [firstClickBlock, secondClickBlock] = [null, null]

doc.ready ->
  matchedList = $('#matched')
  drawPuzzle()
  doc
    .on 'click', '#load-numbers', ->
      drawPuzzle()
    .on 'click', 'span.inactive', ->
      $(@).removeClass('inactive').addClass('active')
      firstClickBlock = @ if firstClickBlock is null
      checkNumber(@) if firstClickBlock isnt @
