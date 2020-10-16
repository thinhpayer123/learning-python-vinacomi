import qrcode
from PIL import Image,ImageDraw,ImageFont

wallet_id = "12345abc"
membercard_id = "Test Text ABC"
img = qrcode.make(membercard_id)

# name_img = str(wallet_id) + '-' +   '.png'

# link_img = './' + name_img
# img.save(link_img)


# sample text and font
unicode_text = "Hello World!"
font = ImageFont.truetype("/usr/share/fonts/truetype/DejaVuSans-Bold.ttf", 28, encoding="unic")

# get the line size
text_width, text_height = font.getsize(wallet_id)

# create a blank canvas with extra space between lines
canvas = Image.new('RGB', (img.size[0] + 10, text_height + 10), "white")

# draw the text onto the text canvas, and use black as the text color
draw = ImageDraw.Draw(canvas)
draw.text(((img.size[0] - text_width)/2,0), wallet_id, 'black', font)

# save the blank canvas to a file
# canvas.save("unicode-text.png", "PNG")

dst = Image.new('RGB', (img.size[0], img.size[1] + canvas.height))
dst.paste(img, (0, 0))
dst.paste(canvas, (0, img.size[1]))

dst.save("unicode-text222.png", "PNG")