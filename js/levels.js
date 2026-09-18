/* ==========================================================================
   Level Configurations: 7 Progressive Flexbox Stages
   Complies with all College Assignment Constraints:
   - display: flex
   - flex-direction (Levels 3, 5, 7)
   - justify-content (Levels 1, 4, 6, 7)
   - align-items (Levels 2, 4, 5, 7)
   - flex-wrap: wrap (Level 6)
   - 4 multi-property combinations (Levels 4, 5, 6, 7)
   ========================================================================== */

export const FLEXBOX_GUIDE = {
  "justify-content": {
    name: "justify-content",
    description: "Aligns flex items along the <strong>Main Axis</strong> (horizontal in <code>row</code>, vertical in <code>column</code>).",
    values: [
      { val: "flex-start", desc: "Items are packed at the start of the axis (left side in a row)." },
      { val: "center", desc: "Items are centered along the axis." },
      { val: "flex-end", desc: "Items are packed at the end of the axis (right side in a row)." },
      { val: "space-between", desc: "Items are distributed evenly: first item at the start edge, last item at the end edge." },
      { val: "space-around", desc: "Items are distributed with equal space around each item." }
    ]
  },
  "align-items": {
    name: "align-items",
    description: "Aligns flex items along the <strong>Cross Axis</strong> (vertical in <code>row</code>, horizontal in <code>column</code>).",
    values: [
      { val: "flex-start", desc: "Items are aligned to the top edge of the cross-axis." },
      { val: "center", desc: "Items are centered along the cross-axis." },
      { val: "flex-end", desc: "Items are aligned to the bottom edge of the cross-axis." },
      { val: "baseline", desc: "Items are aligned along their text baselines." }
    ]
  },
  "flex-direction": {
    name: "flex-direction",
    description: "Defines the direction of the <strong>Main Axis</strong> and order of elements. <em>Note: changing to column swaps the main and cross axes!</em>",
    values: [
      { val: "row", desc: "Items flow horizontally from left to right (default)." },
      { val: "row-reverse", desc: "Items flow horizontally in reverse from right to left." },
      { val: "column", desc: "Items stack vertically from top to bottom (main axis is now vertical)." },
      { val: "column-reverse", desc: "Items stack vertically in reverse from bottom to top." }
    ]
  },
  "flex-wrap": {
    name: "flex-wrap",
    description: "Controls whether flex items are forced into a single line or can wrap onto multiple lines.",
    values: [
      { val: "nowrap", desc: "All items are squeezed onto a single line (default)." },
      { val: "wrap", desc: "Items break onto multiple lines from top to bottom when they overflow." },
      { val: "wrap-reverse", desc: "Items break onto multiple lines in reverse direction." }
    ]
  }
};

export const LEVELS = [
  {
    id: 1,
    title: "Tokyo Sushi Rush",
    subtitle: "Tokyo Restaurant Counter",
    characterImg: "assets/characters/japanese.png",
    characterName: "Japanese Guest",
    foodImg: "assets/foods/sushi.png",
    foodName: "Salmon Sushi Roll",
    itemCount: 2,
    hasOrderLabels: false,
    instruction: "Welcome to Tokyo! Two hungry Japanese guests are waiting, Slide the sushi rolls onto their plates!",
    slots: [
      { property: "justify-content", placeholder: "choose value" }
    ],
    winningSolution: {
      "justify-content": "flex-end"
    },
    availableChips: [
      { property: "justify-content", value: "flex-start" },
      { property: "justify-content", value: "center" },
      { property: "justify-content", value: "flex-end" },
      { property: "justify-content", value: "space-between" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-end",
      "align-items": "flex-start"
    }
  },
  {
    id: 2,
    title: "Napoli Pizza Special",
    subtitle: "Pizzeria Napoletana",
    characterImg: "assets/characters/italian.png",
    characterName: "Italian Chef",
    foodImg: "assets/foods/pizza.png",
    foodName: "Hot Pepperoni Pizza",
    itemCount: 2,
    hasOrderLabels: false,
    instruction: "Mamma Mia! The Italian guests are waiting, Slide the pizza slices down to their plates!",
    slots: [
      { property: "align-items", placeholder: "choose value" }
    ],
    winningSolution: {
      "align-items": "center"
    },
    availableChips: [
      { property: "align-items", value: "flex-start" },
      { property: "align-items", value: "center" },
      { property: "align-items", value: "flex-end" },
      { property: "align-items", value: "baseline" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "flex-start",
      "align-items": "center"
    }
  },
  {
    id: 3,
    title: "A Global Celebration",
    subtitle: "World Cultural Table",
    characters: [
      { img: "assets/characters/japanese.png", name: "Japanese Guest", food: "assets/foods/sushi.png", foodName: "Sushi" },
      { img: "assets/characters/italian.png", name: "Italian Chef", food: "assets/foods/pizza.png", foodName: "Pizza" },
      { img: "assets/characters/mexican.png", name: "Mexican Amigo", food: "assets/foods/taco.png", foodName: "Taco" }
    ],
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "A global celebration! All worlds come together. Give everyone their own dish.",
    slots: [
      { property: "flex-direction", placeholder: "choose value" }
    ],
    winningSolution: {
      "flex-direction": "row-reverse"
    },
    availableChips: [
      { property: "flex-direction", value: "row" },
      { property: "flex-direction", value: "row-reverse" },
      { property: "flex-direction", value: "column" },
      { property: "flex-direction", value: "column-reverse" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "row-reverse",
      "justify-content": "flex-start",
      "align-items": "flex-start"
    }
  },
  {
    id: 4,
    title: "Tel Aviv Rooftop Refreshment",
    subtitle: "Rooftop Lounge",
    characterImg: "assets/characters/israeli.png",
    characterName: "Israeli Guest",
    foodImg: "assets/foods/drink.png",
    foodName: "Vodka & Red Bull",
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "A hot summer day in Tel Aviv! Three guests waiting to there vodka & red bull.",
    slots: [
      { property: "justify-content", placeholder: "main axis spacing" },
      { property: "align-items", placeholder: "cross axis position" }
    ],
    winningSolution: {
      "justify-content": "space-between",
      "align-items": "center"
    },
    availableChips: [
      { property: "justify-content", value: "flex-start" },
      { property: "justify-content", value: "center" },
      { property: "justify-content", value: "space-between" },
      { property: "justify-content", value: "space-around" },
      { property: "align-items", value: "flex-start" },
      { property: "align-items", value: "center" },
      { property: "align-items", value: "flex-end" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "row",
      "justify-content": "space-between",
      "align-items": "center"
    }
  },
  {
    id: 5,
    title: "Kyoto Traditional Dining",
    subtitle: "Kyoto Tea House",
    characterImg: "assets/characters/japanese.png",
    characterName: "Japanese Guest",
    foodImg: "assets/foods/sushi.png",
    foodName: "Salmon Sushi Roll",
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "In a cozy traditional dining room, the guests are alredy seated. Serve the sushi to the guests!",
    slots: [
      { property: "flex-direction", placeholder: "axis direction" },
      { property: "align-items", placeholder: "cross axis alignment" }
    ],
    winningSolution: {
      "flex-direction": "column",
      "align-items": "center"
    },
    availableChips: [
      { property: "flex-direction", value: "row" },
      { property: "flex-direction", value: "column" },
      { property: "flex-direction", value: "column-reverse" },
      { property: "align-items", value: "flex-start" },
      { property: "align-items", value: "center" },
      { property: "align-items", value: "flex-end" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "column",
      "justify-content": "flex-start",
      "align-items": "center"
    }
  },
  {
    id: 6,
    title: "Guadalajara Taco Party",
    subtitle: "Hacienda Banquet Hall",
    characterImg: "assets/characters/mexican.png",
    characterName: "Mexican Amigo",
    foodImg: "assets/foods/taco.png",
    foodName: "Crispy Beef Taco",
    itemCount: 6,
    hasOrderLabels: false,
    instruction: "Fiesta time! Serve all six tacos so everyone gets fed!",
    slots: [
      { property: "flex-wrap", placeholder: "multi-line wrapping" },
      { property: "justify-content", placeholder: "spacing distribution" }
    ],
    winningSolution: {
      "flex-wrap": "wrap",
      "justify-content": "space-around"
    },
    availableChips: [
      { property: "flex-wrap", value: "nowrap" },
      { property: "flex-wrap", value: "wrap" },
      { property: "flex-wrap", value: "wrap-reverse" },
      { property: "justify-content", value: "flex-start" },
      { property: "justify-content", value: "center" },
      { property: "justify-content", value: "space-around" },
      { property: "justify-content", value: "space-between" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "row",
      "flex-wrap": "wrap",
      "justify-content": "space-around",
      "align-items": "flex-start"
    }
  },
  {
    id: 7,
    title: "The Grand Finale!",
    subtitle: "World Summit VIP Table",
    characters: [
      { img: "assets/characters/japanese.png", name: "Japanese Guest", food: "assets/foods/sushi.png", foodName: "Sushi" },
      { img: "assets/characters/italian.png", name: "Italian Chef", food: "assets/foods/pizza.png", foodName: "Pizza" },
      { img: "assets/characters/israeli.png", name: "Israeli Guest", food: "assets/foods/drink.png", foodName: "Vodka & Red Bull" }
    ],
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "The Grand Finale! Three international guests are seated. Deliver the feast to their plates!",
    slots: [
      { property: "flex-direction", placeholder: "vertical reversed" },
      { property: "justify-content", placeholder: "space distribution" },
      { property: "align-items", placeholder: "cross axis position" }
    ],
    winningSolution: {
      "flex-direction": "column-reverse",
      "justify-content": "space-between",
      "align-items": "flex-end"
    },
    availableChips: [
      { property: "flex-direction", value: "column" },
      { property: "flex-direction", value: "column-reverse" },
      { property: "flex-direction", value: "row-reverse" },
      { property: "justify-content", value: "center" },
      { property: "justify-content", value: "space-between" },
      { property: "justify-content", value: "space-around" },
      { property: "align-items", value: "flex-start" },
      { property: "align-items", value: "center" },
      { property: "align-items", value: "flex-end" }
    ],
    targetStyles: {
      "display": "flex",
      "flex-direction": "column-reverse",
      "justify-content": "space-between",
      "align-items": "flex-end"
    }
  }
];
