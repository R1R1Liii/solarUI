function boot () {
	
}
function setup () {
    blockSettings.writeNumber("bootSetupStatus", 0)
    console.log("setupInitialize")
    color.FadeToWhite.startScreenEffect(500)
    pause(500)
    color.clearFadeEffect()
    scene.setBackgroundColor(1)
    textSetup12 = textsprite.create("Hello,", 1, 15)
    textSetup12.setMaxFontHeight(12)
    textSetup12.setPosition(85, 55)
    pause(2000)
    sprites.destroy(textSetup12)
    textSetup2b2 = textsprite.create("solarUI Core", 1, 8)
    textSetup2c2 = textsprite.create("Powered by F4OS", 1, 15)
    textSetup2b2.setPosition(45, 50)
    textSetup2c2.setPosition(80, 75)
    textSetup2b2.setMaxFontHeight(10)
    textSetup2c2.setMaxFontHeight(4)
    pause(2000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    color.FadeToBlack.startScreenEffect(500)
    pause(500)
    color.clearFadeEffect()
    userInput = game.askForString("What is your name?")
}
let userInput = ""
let textSetup2c2: TextSprite = null
let textSetup2b2: TextSprite = null
let textSetup12: TextSprite = null
let maxColor = 0
let bgColor = 0
let textSetup2a2 = null
if (blockSettings.readNumber("bootSetupStatus") == 1) {
    boot()
} else {
    setup()
}
