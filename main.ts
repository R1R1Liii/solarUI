function setupBoot1 () {
    game.showLongText("Let's set you up.", DialogLayout.Bottom)
    game.showLongText("Your device just got more personal with SolarShield.", DialogLayout.Bottom)
    game.showLongText("SolarShield is the built-in security framework of solarUI.", DialogLayout.Bottom)
    game.showLongText("SolarShield enables PIN login. Your credentials will be encrypted on-device.", DialogLayout.Bottom)
    systemPinLength = game.askForNumber("Set your PIN length. 0 to skip PIN setup.", 1, true)
    if (systemPinLength >= 4 && systemPinLength != 0) {
        blockSettings.writeNumber("systemPin", game.askForNumber("Set your PIN. Avoid using patterns or repeating numbers.", systemPinLength, true))
        game.showLongText("PIN set as " + blockSettings.readString("systemPin"), DialogLayout.Bottom)
        setupBoot2()
    } else {
        if (systemPinLength == 0) {
            setupBoot2()
        } else {
            game.showLongText("PIN is too short. Your PIN must be at least 4 digits for effective security.", DialogLayout.Bottom)
            game.showLongText("The setup process will be restarted for maxiumum security.", DialogLayout.Bottom)
            setupBoot1()
        }
    }
}
function enableCursor (en: boolean) {
    if (en) {
        controller.moveSprite(systemCursorPointer, 100, 100)
    } else {
        controller.moveSprite(systemCursorPointer, 0, 0)
    }
    systemCursorPointer.setFlag(SpriteFlag.Invisible, !(en))
    systemCursor.setFlag(SpriteFlag.Invisible, !(en))
}
function renderCursor () {
    systemCursor = sprites.create(assets.image`systemCursorImg`, SpriteKind.Player)
    systemCursorPointer = sprites.create(assets.image`systemCursorPointerImg`, SpriteKind.Player)
    systemCursorPointer.setStayInScreen(true)
    systemCursor.z = 50
    systemCursorPointer.z = 50
    enableCursor(true)
}
function animationBoot () {
    animationBoot1 = sprites.create(assets.image`animationEmpty`, SpriteKind.Player)
    animationBoot1.setPosition(75, 75)
    for (let index = 0; index < 2; index++) {
        animation.runImageAnimation(
        animationBoot1,
        assets.animation`systemBootAnimation`,
        200,
        true
        )
    }
}
function debugTerminal (duration: number) {
    for (let index = 0; index < duration; index++) {
        if (controller.A.isPressed() && controller.menu.isPressed()) {
            userInput = game.askForString("Enter function name", 12, false)
            if (userInput == "setupBoot") {
                setupBoot1()
            }
        }
        // pause expects milliseconds as integer
        pause(900)
    }
}
function boot () {
    scene.setBackgroundColor(15)
    textSetup2b2 = textsprite.create("solarUI Core", 15, 8)
    textSetup2b2.setPosition(45, 45)
    textSetup2b2.setMaxFontHeight(10)
    animationBoot()
}
function setup () {
    debugTerminal(4000)
    blockSettings.writeNumber("bootSetupStatus", 0)
    console.log("setupInitialize")
    scene.setBackgroundColor(1)
    color.startFade(color.Black, color.originalPalette, 2000)
    color.pauseUntilFadeDone()
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
    color.startFade(color.originalPalette, color.Black, 500)
    color.pauseUntilFadeDone()
    scene.setBackgroundColor(15)
    color.startFade(color.Black, color.originalPalette)
    color.pauseUntilFadeDone()
    game.showLongText("You will now view the whole copyright license. By using the \"SOFTWARE\" you agree to the copright license.", DialogLayout.Full)
    game.showLongText("Copyright (c) 2026 Huaxia Interactive | All rights reserved. | Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to use, study, and modify the Software for personal, educational, or internal use, subject to the limitations below. | RESTRICTIONS  1. Redistribution Prohibited: The Software, whether in original or modified form, may NOT be copied, published, shared, sublicensed, sold, or otherwise redistributed, in whole or in part, without prior explicit written permission from Huaxia Interactive. 2. Commercial Distribution: Any form of commercial distribution, hosting, bundling, or resale is strictly prohibited without prior written authorization from Huaxia Interactive.  3. Ownership: This license does not grant ownership of the Software. All intellectual property rights remain exclusively with Huaxia Interactive. | DISCLAIMER: THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.", DialogLayout.Full)
    game.showLongText("Please ensure you select correct model." + " Incorrect model selection may cause severe performance issues, data loss/corruption, permanent device damage and firmware incompatibility" + ". ", DialogLayout.Full)
    setupMenu1 = miniMenu.createMenu(
    miniMenu.createMenuItem("Retro Arcade for EDU"),
    miniMenu.createMenuItem("Standard F4 Based Board"),
    miniMenu.createMenuItem("MeowBit"),
    miniMenu.createMenuItem("PyBadge LC"),
    miniMenu.createMenuItem("AMD52 Based Board"),
    miniMenu.createMenuItem("AMD51 Based Board"),
    miniMenu.createMenuItem("Nordic MCU Based Board(s)"),
    miniMenu.createMenuItem("F1 Based Board")
    )
    setupMenu1.setTitle("Device Type:")
    setupMenu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 1)
    setupMenu1.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 0)
    setupMenu1.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            game.showLongText("Your Device is Officially Supported" + "Configuring F4OS..." + "Device will Restart Soon", DialogLayout.Full)
            blockSettings.writeNumber("bootSetupStatus", 2)
            blockSettings.writeNumber("bootDeviceType", 1)
            game.reset()
        } else if (selectedIndex == 1) {
            game.showLongText("Your Processor is Officially Supported" + "Please check you screen resolution for incompatibility" + "Configuring F4OS" + "Device will Restart Soon", DialogLayout.Full)
            blockSettings.writeNumber("bootSetupStatus", 2)
            blockSettings.writeNumber("bootDeviceType", 2)
            game.reset()
        } else if (selectedIndex == 4) {
            game.showLongText("Your Processor is Unofficially Supported" + "Please check you screen resolution for incompatibility" + "Configuring F4OS" + "Device will Restart Soon" + "F4OS kernel and SolarUI are not optimized for this device" + "Some features will not be availble and you may experience bugs", DialogLayout.Full)
            blockSettings.writeNumber("bootSetupStatus", 2)
            blockSettings.writeNumber("bootDeviceType", 2)
            game.reset()
        } else {
            game.showLongText("Your Processor is Not Officially Supported" + "Your device does not meet the minimum requirements of SolarUI" + "Please ensure screen resolution is a least 160 x 90" + "Please ensure you have 64KB of usable RAM" + "Device will crash if the specifications are lower than required" + "F4OS Kernel and SolarUI are NOT optimized for this device." + "Only critical features will be availible" + "Device will Restart Soon", DialogLayout.Full)
            blockSettings.writeNumber("bootSetupStatus", 2)
            blockSettings.writeNumber("bootDeviceType", 2)
            game.reset()
        }
    })
}
function setupBoot2 () {
    game.showLongText("Your device is SolarLINK compatible.", DialogLayout.Bottom)
    game.showLongText("SolarLINK is an efficient wirless networking protocol made specifically for SolarUI.", DialogLayout.Bottom)
    game.showLongText("SolarLINK enables wireless connection to a compatible external Nexus AI server and encrypted RSS Texting.", DialogLayout.Bottom)
    game.showLongText("You can turn on SolarLINK after setup.", DialogLayout.Bottom)
    game.showLongText("\"The Impossible is Now Possible\"", DialogLayout.Bottom)
    game.showLongText("Nexus AI on SolarUI Core runs Intelligence 4.5 Nano; our most powerful Generative SLM AI Assistant.", DialogLayout.Bottom)
    game.showLongText("Nexus AI can understand user intent and can generate a response using natural language.", DialogLayout.Bottom)
    game.showLongText("Nexus AI understands user intent with a 99% processing accuracy, enabled by our 4.8K parameter, triple layer Dedicated Response Engine.", DialogLayout.Bottom)
    game.showLongText("By running Nexus AI on our Solar Private Compute, you can be confident that you stay in control of your data.", DialogLayout.Bottom)
    game.showLongText("Privacy is a human right, so we never will perform any machine learning on your conversations.", DialogLayout.Bottom)
    game.showLongText("Nexus AI connects via SolarLINK for high-performance output.", DialogLayout.Bottom)
    game.showLongText("You can connect to a Solar Private Compute after setup.", DialogLayout.Bottom)
    game.showLongText("Finally, let's set up your SolarID for SolarUI Core; which is kept encrypted, on device only.", DialogLayout.Bottom)
    blockSettings.writeString("solarIdName", game.askForString("What would you like us to call you?", 12, true))
    game.showLongText("Welcome to SolarUI Core, " + blockSettings.readString("solarIdName") + ". Your device will reboot to apply changes.", DialogLayout.Bottom)
    blockSettings.writeNumber("bootSetupStatus", 1)
}
let setupMenu1: miniMenu.MenuSprite = null
let textSetup2c2: TextSprite = null
let textSetup12: TextSprite = null
let textSetup2b2: TextSprite = null
let userInput = ""
let animationBoot1: Sprite = null
let systemCursor: Sprite = null
let systemCursorPointer: Sprite = null
let systemPinLength = 0
let maxColor = 0
let bgColor = 0
let textSetup2a2 = null
if (blockSettings.readNumber("bootSetupStatus") == 1) {
    boot()
} else if (blockSettings.readNumber("bootSetupStatus") == 2) {
    setupBoot1()
} else {
    setup()
}
