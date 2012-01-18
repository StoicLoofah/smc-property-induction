import string
import random

animals = ['', 
           "Antelopes", #1
           "Grizzly bears", #2
           "Killer whales", #3
           "Beavers", #4
           "Dalmatians", #5
           "Persian cats", #6
           "Horses", #7
           "German shepherds", #8
           "Blue whales", #9
           "Siamese cats", #10
           "Skunks", #11
           "Moles", #12
           "Tigers", #13
           "Hippopotamuses", #14
           "Leopards", #15
           "Moose", #16
           "Spider monkeys", #17
           "Humpback whales", #18
           "Elephants", #19
           "Gorillas", #20
           "Oxen", #21
           "Foxes", #22
           "Sheep", #23
           "Seals", #24
           "Chimpanzees", #25
           "Hamsters", #26
           "Squirrels", #27
           "Rhinoceroses", #28
           "Rabbits", #29
           "Bats", #30
           "Giraffes", #31
           "Wolves", #32
           "Chihuahuas", #33
           "Rats", #34
           "Weasels", #35
           "Otters", #36
           "Buffaloes", #37
           "Zebras", #38
           "Giant pandas", #39
           "Deer", #40
           "Bobcats", #41
           "Pigs", #42
           "Lions", #43
           "Mice", #44
           "Polar bears", #45
           "Collies", #46
           "Walruses", #47
           "Raccoons", #48
           "Cows", #49
           "Dolphins", #50
           'All mammals', #51
           ]

#start with specific, then general, then made up
arguments = [[50, 24, 7], # .06
             [25, 20, 7], # .23
             [27, 24, 7], # .26
             [27, 50, 7], # .32
             [25, 27, 7], # .4
             [20, 24, 7], # .41
             [25, 24, 7], # .43
             [20, 44, 7], # .48
             [27, 19, 7], # .54
             [19, 28, 7], # .57
             [20, 19, 7], # .61
             [20, 28, 7], # .63
             [49, 50, 7], # .73
             [49, 20, 7], # .75
             [49, 25, 7], # .79
             [49, 19, 28, 51], # 0.14, garden path (2 large, 1 medium)
             [7, 50, 24, 51], # 0.27, garden path (2 water, 1 land)
             [25, 20, 24, 51], # 0.3, garden path (2 primate, 1 not)
             [44, 19, 28, 51], # 0.31, garden path (2 large, 1 small)
             [44, 27, 24, 51], # 0.35, garden path (2 small, 1 water)
             [49, 25, 19, 51], # 0.4, general (Nothing)
             [7, 27, 19, 51], # 0.47, general (Nothing)
             [7, 50, 19, 51], # 0.49, general (2 land, 1 water?)
             [20, 44, 19, 51], # 0.58, general (2 African, 1 generic?)
             [25, 27, 19, 51], # 0.62, general (2 African, 1 generic?)
             [7, 20, 27, 51], # 0.64, general (Nothing)
             [27, 50, 28, 51], # 0.68 general (Nothing)
             [44, 24, 19, 51], # 0.7 general (Nothing)
             [7, 25, 24, 51], # 0.75 general (Nothing)
             [25, 27, 50, 51], # 0.8 general (Nothing)
             [1, 40, 39, 45], #all specific, 2 pairs of similar animals
             [48, 47, 46, 42], #all specific, full diversity
             [21, 37, 51, 17], #general is a premise, other 2 are similar, conclusion is dissimilar
             [39, 19, 51, 28], #general is a premise, other 2 are different, conclusion is similar to 1 of them
             [3, 9, 18, 51], #consistent premises, Coley
             [13, 15, 43, 51], #consistent premises, Coley
             [3, 18, 34, 51], #garden path, Coley
             [34, 44, 47, 51], #garden path, Coley
             [5, 8, 19, 46], #2 dogs + elephant as premises, dog conclusion
             [25, 44, 7], #catch
             [20, 50, 7], #catch
             ]

count = 1
enzymes = []
for statements in arguments:
    enzyme = random.choice(string.uppercase) + str(random.randint(10,999))
    while enzyme in enzymes:
        enzyme = random.choice(string.uppercase) + str(random.randint(10,999))
    enzymes.append(enzyme)

    prop = ' have enzyme ' + enzyme + '.'

    print('{"trial":' + str(count) + ', "isCatch": 0,')
    print('"premises": [')
    for statement in statements[0:-1]:
        if statement == statements[-2]:
            print('{"animal":' + str(statement) +', "text":"' + animals[statement] + prop + '"}')
        else:
            print('{"animal":' + str(statement) +', "text":"' + animals[statement] + prop + '"},')
    print('],')
    print('"conclusion": {"animal":' + str(statements[-1]) + ', "text":"Therefore, ' + animals[statements[-1]].lower() + prop + '"}')
    print('},')
    count += 1

