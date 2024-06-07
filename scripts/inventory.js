import Location from "./location.js";

export default class Inventory {
  constructor() {
    this.inventory = {};
    this.addInventoryPanel = document.querySelector("#add-inventory");
    this.itemTitle = document.querySelector("#item-title");
    this.newItem = document.querySelector("#new-item");
    this.addBtn = document.querySelector("#add-btn");
    this.clickAdd = new Audio("./assets/sound/clickAdd.ogg");
    this.useItemSound = new Audio("./assets/sound/useItem.ogg");

    this.itemUsageTime = {
      blackberries: {
        neededIn: "farm",
        locationUpdate: new Location(
          "farm",
          [
            "Woah, these are some top-notch blackberries. Thank you so much!",
            "In this village, everyone has plumbing issues. Here's a wrench. I hope you find it useful.",
          ],
          "no-item",
          "Jeannot",
          "jeannot",
          true
        ),
        giftedItem: "wrench",
        outputName: "Jeannot",
        character: "jeannot",
        finalText:
          "Thanks again for the berries. I hope you found the wrench useful.",
      },
      redcurrants: {
        neededIn: "farm",
        locationUpdate: new Location(
          "farm",
          [
            "Woah, these are some top-notch redcurrants. Thank you so much!",
            "In this village, everyone has plumbing issues. Here's a wrench. I hope you find it useful.",
          ],
          "no-item",
          "Mihir",
          "jeannot",
          true
        ),
        giftedItem: "wrench",
        outputName: "Mihir",
        character: "jeannot",
        finalText:
          "Thanks again for the berries. I hope you found the wrench useful.",
      },
      wrench: {
        neededIn: "emily-house",
        locationUpdate: new Location(
          "emily-house",
          [
            "NICE WRENCH. This leak was out here getting me DRENCHED.",
            "I don't have any cookies left but I can give you this nice honeypot.",
            "I hope you find Het soon.",
          ],
          "no-item",
          "Salt-Bae",
          "emily",
          true
        ),
        giftedItem: "honey",
        outputName: "Salt-Bae",
        character: "emily",
        finalText:
          "The leak is almost fixed! You're as sweet as that honey I gave you.",
      },
      honey: {
        neededIn: "lavoir",
        locationUpdate: new Location(
          "lavoir",
          [
            "Sweet nectar of the gods! You are making me very happy.",
            "Here's a fresh healing potion I just made. I hope it helps you and your family stay healthy.",
          ],
          "no-item",
          "Nidhi",
          "fairy",
          true
        ),
        giftedItem: "potion",
        outputName: "Nidhi",
        character: "fairy",
        finalText: "You're back? At least you look healthy.",
      },
      potion: {
        neededIn: "twins",
        locationUpdate: new Location(
          "twins",
          [
            "Oh dear, is that potion for me?",
            "Ah oui, c'est pas de la piquette! I already feel much better thank you.",
            "You seem to like mysterious items, let me show you something mysterious..",
            "One of our hens layed this funny-looking giant egg. It's extremely hot, maybe you'll find a way to use it.",
            "Take good care of the egg and good luck on your quest.",
          ],
          "no-item",
          "DC",
          "paulette",
          true
        ),
        giftedItem: "core",
        outputName: "DC",
        character: "paulette",
        finalText:
          "Oh! I feel much better with that potion you gave me. Come back anytime.",
      },
      key: {
        neededIn: "castle",
        locationUpdate: new Location(
          "cellar",
          [
            "Flick. Flick. The key allowed you to enter the great cellar of the castle. It’s mostly spiderwebs and dust now.",
          ],
          "wine",
          "The Castle's Cellar"
        ),
        outputName: "Castle Ruins",
        finalText:
          "According to legend, it was also used to mint coins illegally. You could try to go inside but the doors are locked..",
      },
      scroll: { neededIn: "island" },
      pumpkin: {
        neededIn: "tree",
        locationUpdate: new Location(
          "tree",
          [
            "What a good-looking pumpkin. She's THICKKK, I'll add her to my good soup.",
            "I know just what you need. You'll find what you're looking for on MOUNT DOOM.",
            "It’s a hidden area that you won’t find by yourself but I can give you access.",
            "You should now find MOUNT DOOM on your map.",
          ],
          "no-item",
          "ParthOnCam",
          "witch",
          true
        ),
        outputName: "ParthOnCam",
        character: "witch",
        finalText: "Warlocks don't do friendships. You need to leave.",
      },
      gold: {
        neededIn: "town-hall",
        locationUpdate: new Location(
          "town-hall",
          [
            "Jeez louise, that's a whole lot of money. My office could use a better desk... ",
            "Especially for those late-night 'meetings'. To thank you, take this key. It may unlock some places in the village.",
          ],
          "no-item",
          "Mayor",
          "mayor",
          true
        ),
        giftedItem: "key",
        outputName: "Mayor",
        character: "mayor",
        finalText: "Whoever is happy will make others happy too.",
      },
      core: {
        neededIn: "island",
        locationUpdate: new Location(
          "island-power",
          [
            "SPLOOSH. I have absorbed the new core and the village is saved. Thank you.",
            "I am ready to give Het back to you. One last thing, what is the village's magic formula?",
          ],
          "no-item",
          "Volcano Island",
          null, // volcano-island ?
          true
        ),
        outputName: "Mount Doom",
        finalText:
          "I am ready to give Het back to you. One last thing, what is the village magic formula?",
      },
      gourdin: { neededIn: "bins" },
      wine: {
        neededIn: "bus-stop",
        locationUpdate: new Location(
          "bus-stop",
          [
            "Hehe glou glou. That's a nice old bottle you got there.",
            "What else can I tell you about the village? Oh! The bestfriends are actually not friends, they're actually a couple.",
            "Perhaps this will be actually useful: Everyone knows this: if you ever need help in this village, just say 'UNGA UNGA'.",
          ],
          "no-item",
          "Crazy BagMan",
          "villager",
          true
        ),
        outputName: "Crazy BagMan",
        character: "villager",
        finalText: "Remember.. 'UNGA UNGA'",
      },
    };
  }

  updateInventory() {
    this.addInventoryPanel.style.display = "none";
    let inventoryItems = document.querySelectorAll(".inventory-item");
    let inventoryItemsCounter = 0;

    // clone inventory to reset all addeventlisteners
    let currentInventory = document.querySelector("#inventory");
    currentInventory.replaceWith(currentInventory.cloneNode(true));
    currentInventory = document.querySelector("#inventory");

    let answerBtn = document.querySelector("#answer");
    answerBtn.replaceWith(answerBtn.cloneNode(true));
    answerBtn = document.querySelector("#answer");

    inventoryItems = document.querySelectorAll(".inventory-item");

    for (const item in this.inventory) {
      if (this.inventory[item] === "collected") {
        inventoryItems[
          inventoryItemsCounter
        ].style.background = `center / contain no-repeat url(./assets/images/${item}.png)`;
        inventoryItems[inventoryItemsCounter].parentElement.addEventListener(
          "click",
          () => {
            this.useItemSound.play();
            this.useItem(item);
          }
        );
        inventoryItemsCounter++;
      }
    }
    for (let i = inventoryItemsCounter; i < inventoryItems.length; i++) {
      inventoryItems[i].style.removeProperty("background");
    }
  }

  addInventory(itemName) {
    this.addInventoryPanel.style.display = "block";
    this.itemTitle.textContent = this.toCapitalize(itemName);
    this.newItem.style.background = `center / contain no-repeat url(./assets/images/${itemName}.png)`;
    this.addBtn.addEventListener("click", () => {
      this.clickAdd.play();
      this.updateInventory();
    });
  }

  toCapitalize(itemName) {
    return (
      itemName.slice(0, 1).toUpperCase() + itemName.slice(1, itemName.length)
    );
  }

  useItem(currentItem) {
    const currentLocationUrl =
      document.querySelector("#location").style.background;
    const currentLocation = currentLocationUrl.slice(
      currentLocationUrl.indexOf("images/") + 7,
      currentLocationUrl.indexOf(".jpg")
    );

    if (this.itemUsageTime[currentItem].neededIn === currentLocation) {
      //   this.inventory[currentItem] = false;
      if (currentItem !== "key") {
        this.inventory[currentItem] = "used";
      }
      this.updateInventory();
      this.itemUsageTime[currentItem].locationUpdate.goToLocation(
        this,
        this.itemUsageTime[currentItem].giftedItem
      );

      let locationOnMap = document.querySelector(`#${currentLocation}`);
      locationOnMap.replaceWith(locationOnMap.cloneNode(true));
      locationOnMap = document.querySelector(`#${currentLocation}`);

      let finalLocation = null;
      if (currentLocation === "island") {
        finalLocation = new Location(
          "island-power",
          [this.itemUsageTime[currentItem].finalText],
          "no-item",
          this.itemUsageTime[currentItem].outputName,
          this.itemUsageTime[currentItem].character
        );
      } else {
        finalLocation = new Location(
          currentLocation,
          [this.itemUsageTime[currentItem].finalText],
          "no-item",
          this.itemUsageTime[currentItem].outputName,
          this.itemUsageTime[currentItem].character
        );
      }

      locationOnMap.addEventListener("click", () => {
        finalLocation.goToLocation(this);
      });
      //   this.addGiftedItem(this.itemUsageTime[currentItem].giftedItem);
    }
  }

  //   addGiftedItem(itemName) {
  //     document.querySelector(`#${itemName}`).style.display = "none";
  //     this.inventory[itemName] = true;
  //     this.addInventory(`${itemName}`);
  //   }
}
