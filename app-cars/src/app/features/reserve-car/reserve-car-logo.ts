const imageNames = [
  'audi',
  'bentley',
  'bmw',
  'chevrolet',
  'Chrysler',
  'ford',
  'jeep',
  'lexus',
  'mazda',
  'Mercedes Benz',
  'Mini',
  'opel',
  'porsche',
  'Rolls Royce',
  'Rover',
  'seat',
  'smart',
  'subaru',
  'tesla',
  'Volkswagen',
];

const imageUrls = [
  'https://i.postimg.cc/YSLDHn5n/audi.jpg',
  'https://i.postimg.cc/fL42T7Zw/bentley.jpg',
  'https://i.postimg.cc/Kzn9KKvt/bmw.jpg',
  'https://i.postimg.cc/cC0Ffsr2/chevrolet.jpg',
  'https://i.postimg.cc/90bJpv9M/chrissler.jpg',
  'https://i.postimg.cc/44QLsh0g/ford.jpg',
  'https://i.postimg.cc/wTxWvjKs/jeep.jpg',
  'https://i.postimg.cc/SNZgzbq1/lexus.jpg',
  'https://i.postimg.cc/nhC04ShF/mazda.jpg',
  'https://i.postimg.cc/P59K2bCm/mercedez.jpg',
  'https://i.postimg.cc/HLMzKJMF/Mini.jpg',
  'https://i.postimg.cc/j5rcrsQ2/opel.jpg',
  'https://i.postimg.cc/nzYkF60k/porsche.jpg',
  'https://i.postimg.cc/Y0rxhbPw/Rolls.jpg',
  'https://i.postimg.cc/MH9mR1kf/Rover.jpg',
  'https://i.postimg.cc/MZ5DhJcZ/seat.jpg',
  'https://i.postimg.cc/m2rw4pMY/smart.jpg',
  'https://i.postimg.cc/651hpVLD/subaru.jpg',
  'https://i.postimg.cc/13nrngv4/tesla.jpg',
  'https://i.postimg.cc/Dw9dq2N6/vw.jpg',
];

export const carData = imageNames.map((name, index) => {
  return { name: name, link: imageUrls[index] };
});


