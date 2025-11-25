const RANDOM_NAMES = [
    "Alex", "Maria", "John", "Sophie", "Ethan",
    "Olivia", "Daniel", "Emily", "Michael", "Grace",
    "Matthew", "Isabella", "James", "Charlotte", "Benjamin",
    "Harper", "Lucas", "Amelia", "Henry", "Ella",
    "Jack", "Mia", "Alexander", "Ava", "William",
    "Scarlett", "Sebastian", "Lily", "David", "Chloe",
    "Joseph", "Penelope", "Samuel", "Victoria", "Anthony",
    "Natalie", "Joshua", "Aria", "Ryan", "Zoe",
    "Nathan", "Hannah", "Andrew", "Layla", "Christian",
    "Aurora", "Jonathan", "Savannah", "Christopher", "Brooklyn",
    "Gabriel", "Lucy", "Isaac", "Stella", "Aaron",
    "Violet", "Elijah", "Paisley", "Connor", "Skylar",
    "Dylan", "Claire", "Hunter", "Anna", "Charles",
    "Bella", "Austin", "Madison", "Landon", "Riley",
    "Julian", "Hazel", "Brayden", "Leah", "Cameron",
    "Ellie", "Adam", "Anna", "Maxwell", "Nora",
    "Evan", "Samantha", "Leo", "Sarah", "Gavin",
    "Audrey", "Nicholas", "Arianna", "Parker", "Savannah",
    "Justin", "Gianna", "Tyler", "Eva", "Owen",
    "Luna", "Jason", "Sadie", "Mason", "Ruby"
];

export const getRandomName = () => {
    const name_idx = Math.round(Math.random() * (RANDOM_NAMES.length - 1))
    return RANDOM_NAMES[name_idx]
}