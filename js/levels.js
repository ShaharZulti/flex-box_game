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

export const LEVELS = [
  {
    id: 1,
    title: "Tokyo Sushi Rush",
    subtitle: "Main Axis Alignment with justify-content",
    characterImg: "assets/characters/japanese.jpg",
    characterName: "Japanese Guest",
    foodImg: "assets/foods/sushi.jpg",
    foodName: "Salmon Sushi Roll",
    itemCount: 2,
    hasOrderLabels: false,
    instruction: "Welcome to Tokyo! Two hungry guests are seated at the far right end of the dining counter. Use <code>justify-content</code> to slide their sushi plates horizontally to the end of the line.",
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
    subtitle: "Cross Axis Alignment with align-items",
    characterImg: "assets/characters/italian.jpg",
    characterName: "Italian Chef",
    foodImg: "assets/foods/pizza.jpg",
    foodName: "Hot Pepperoni Pizza",
    itemCount: 2,
    hasOrderLabels: false,
    instruction: "Mamma Mia! The pizza slices are currently stuck at the top of the table, but the Italian chefs are waiting in the vertical center. Use <code>align-items</code> to center the pizzas vertically along the cross-axis.",
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
    title: "Taco Fiesta Reversal",
    subtitle: "Direction Inversion with flex-direction",
    characterImg: "assets/characters/mexican.jpg",
    characterName: "Mexican Amigo",
    foodImg: "assets/foods/taco.jpg",
    foodName: "Crispy Beef Taco",
    itemCount: 3,
    hasOrderLabels: true, // Shows numbers 1, 2, 3 to make reversal crystal clear
    instruction: "¡Ay, caramba! The guests sat down in reverse order (Amigo #3 on the left, #1 on the right)! Use <code>flex-direction</code> to reverse the horizontal row so each numbered taco reaches its matching amigo.",
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
    subtitle: "Combination 1: Spacing & Cross-Axis Centering",
    characterImg: "assets/characters/israeli.jpg",
    characterName: "Israeli Guest",
    foodImg: "assets/foods/drink.jpg",
    foodName: "Iced Lemon Drink",
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "It's a hot sunny day on a Tel Aviv rooftop! Three guests are seated spaced evenly apart across the width of the table, centered vertically. Use both <code>justify-content</code> and <code>align-items</code> to deliver their cold drinks.",
    slots: [
      { property: "justify-content", placeholder: "horizontal spacing" },
      { property: "align-items", placeholder: "vertical alignment" }
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
    title: "Kyoto Vertical Bento Express",
    subtitle: "Combination 2: Vertical Column & Centering",
    characterImg: "assets/characters/japanese.jpg",
    characterName: "Japanese Guest",
    foodImg: "assets/foods/sushi.jpg",
    foodName: "Salmon Sushi Roll",
    itemCount: 3,
    hasOrderLabels: false,
    instruction: "In a narrow traditional Japanese dining room, guests are seated vertically from top to bottom, perfectly centered in the middle of the table! Change the main axis to vertical with <code>flex-direction</code>, and center them with <code>align-items</code>.",
    slots: [
      { property: "flex-direction", placeholder: "axis direction" },
      { property: "align-items", placeholder: "cross-axis alignment" }
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
    title: "Guadalajara Taco Party (Flex Wrap!)",
    subtitle: "Combination 3: Wrapping Lines onto Multiple Rows",
    characterImg: "assets/characters/mexican.jpg",
    characterName: "Mexican Amigo",
    foodImg: "assets/foods/taco.jpg",
    foodName: "Crispy Beef Taco",
    itemCount: 6,
    hasOrderLabels: false,
    instruction: "Big Fiesta celebration! Six amigos are dining together. A single line cannot fit all six plates! Use <code>flex-wrap</code> to allow dishes to wrap onto multiple rows, and space them generously with <code>justify-content: space-around</code>.",
    slots: [
      { property: "flex-wrap", placeholder: "line wrapping" },
      { property: "justify-content", placeholder: "horizontal distribution" }
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
    title: "The Grand International Banquet",
    subtitle: "Combination 4: Master Chef 3-Property Triad",
    // Special multi-character banquet level!
    characters: [
      { img: "assets/characters/japanese.jpg", name: "Japanese Guest", food: "assets/foods/sushi.jpg", foodName: "Sushi", order: 1 },
      { img: "assets/characters/italian.jpg", name: "Italian Chef", food: "assets/foods/pizza.jpg", foodName: "Pizza", order: 2 },
      { img: "assets/characters/israeli.jpg", name: "Israeli Guest", food: "assets/foods/drink.jpg", foodName: "Drink", order: 3 }
    ],
    itemCount: 3,
    hasOrderLabels: true,
    instruction: "The ultimate Master Chef test! Three VIP international guests are seated vertically from bottom-to-top in reverse order (#3 at top, #1 at bottom), spaced apart at the far right edge of the table. Combine <code>flex-direction</code>, <code>justify-content</code>, and <code>align-items</code>!",
    slots: [
      { property: "flex-direction", placeholder: "vertical reversed" },
      { property: "justify-content", placeholder: "space distribution" },
      { property: "align-items", placeholder: "cross-axis alignment" }
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
