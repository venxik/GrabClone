const generateRandomColor = () => {
  return "#"+((1<<24)*Math.random()|0).toString(16)
}

const menuData = [
  {
    title: 'Food',
    icon: 'fast-food',
  },
  {
    title: 'Mart',
    icon: 'basket',
  },
  {
    title: 'Express',
    icon: 'logo-dropbox'
  },
  {
    title: 'Pulsa/Token',
    icon: 'phone-portrait-outline',
  },
  {
    title: 'Car',
    icon: 'car',
  },
  {
    title: 'Bike',
    icon: 'pedal-bike',
  },
  {
    title: 'Insurance',
    icon: 'umbrella',
  },
  {
    title: 'More',
    icon: 'more-horiz',
  },
];

const discount = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    content: "Until 13 dec",
    color: generateRandomColor()
  },
  {
    title: "Lorem ipsum dolt, consectetur adipiscing elit",
    content: "Until 15 dec",
    color: generateRandomColor(),
  },
]

const keepDiscovering = Array.apply(null, Array(10)).map((v, i) => {
  return {
    title: `Lorem ipsum dolt, consectetur adipiscing elit ${i}`,
    content: `Until ${i} dec`,
    color: generateRandomColor(),
  };
});

export {menuData, discount, keepDiscovering};
