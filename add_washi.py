import re

with open('index.html', 'r') as f:
    content = f.read()

# Page 9
content = content.replace('<div class="gift-wrapper" id="giftBox">', 
                          '<div class="washi w-green w-dots w-short" style="top: 15px; right: -5px; transform: rotate(45deg);"></div>\n                    <div class="washi w-peach w-stripes w-short" style="bottom: 40px; left: 10px; transform: rotate(-25deg);"></div>\n                    <div class="gift-wrapper" id="giftBox">')

# Page 8
content = content.replace('<p class="paper-text message-text-long">Selamat',
                          '<div class="washi w-pink w-grid w-medium" style="top: 20px; left: 20px; transform: rotate(-15deg);"></div>\n                    <div class="washi w-yellow w-dots w-short" style="bottom: 25px; right: 15px; transform: rotate(-35deg);"></div>\n                    <p class="paper-text message-text-long">Selamat')

# Page 7
content = content.replace('<iframe style="border-radius:12px"',
                          '<div class="washi w-blue w-stripes w-long" style="top: 10px; left: 50%; transform: translateX(-50%) rotate(-2deg);"></div>\n                    <div class="washi w-purple w-grid w-medium" style="bottom: 10px; right: 10px; transform: rotate(15deg);"></div>\n                    <iframe style="border-radius:12px"')

# Page 6
content = content.replace('<div class="center-date">6 Agustus 2026</div>',
                          '<div class="washi w-pink w-stripes w-short" style="top: 10%; right: 10%; transform: rotate(45deg);"></div>\n                    <div class="washi w-yellow w-dots w-short" style="bottom: 15%; left: 10%; transform: rotate(-45deg);"></div>\n                    <div class="washi w-green w-grid w-medium" style="bottom: 50%; right: -10px; transform: rotate(-85deg);"></div>\n                    <div class="center-date">6 Agustus 2026</div>')

# Page 5
content = content.replace('<p class="paper-text message-text">Hari ini',
                          '<div class="washi w-blue w-grid w-medium" style="top: 15px; left: 15px; transform: rotate(-25deg);"></div>\n                    <div class="washi w-peach w-stripes w-short" style="bottom: 20px; right: 20px; transform: rotate(35deg);"></div>\n                    <p class="paper-text message-text">Hari ini')

# Page 4
content = content.replace('<div class="tape grey-tape"></div>',
                          '<div class="washi w-pink w-dots w-long" style="top: 10px; right: -5px; transform: rotate(35deg);"></div>\n                    <div class="washi w-purple w-stripes w-medium" style="bottom: 20px; left: 10px; transform: rotate(-15deg);"></div>')

# Page 3
content = content.replace('<div class="word">',
                          '<div class="washi w-yellow w-stripes w-long" style="top: 15px; left: -10px; transform: rotate(-35deg);"></div>\n                    <div class="washi w-blue w-grid w-short" style="bottom: 20px; right: 15px; transform: rotate(45deg);"></div>\n                    <div class="washi w-green w-dots w-medium" style="bottom: 10px; left: 15px; transform: rotate(-15deg);"></div>\n                    <div class="word">', 1)

# Page 2
content = content.replace('<div class="tape tape-center"></div>',
                          '<div class="washi w-pink w-stripes w-long" style="top: 20px; left: 50%; transform: translateX(-50%) rotate(-5deg);"></div>')

# Page 1
content = content.replace('<div class="tape tape-top"></div>',
                          '<div class="washi w-yellow w-stripes w-long" style="top: 15px; right: 10px; transform: rotate(25deg);"></div>\n                    <div class="washi w-peach w-dots w-medium" style="top: 50px; left: 10px; transform: rotate(-15deg);"></div>')
content = content.replace('<div class="tape tape-bottom"></div>',
                          '<div class="washi w-blue w-grid w-short" style="bottom: 90px; left: 20px; transform: rotate(15deg);"></div>')

# Write back
with open('index.html', 'w') as f:
    f.write(content)

print("Done")
