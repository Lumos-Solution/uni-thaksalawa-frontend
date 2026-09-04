/*
 * Towns in Sri Lanka, offered as suggestions on the class location field.
 *
 * This backs the *fallback* path: picking a spot on the map is preferred and
 * gives exact coordinates, but a teacher can still type a town (and must, when
 * no Maps key is configured). The list is a starting point for autocomplete,
 * not a whitelist - the geocoder can legitimately name a small village that
 * isn't here, so free text is still accepted.
 *
 * Covers the main towns of all 25 districts, alphabetically.
 */
export const SRI_LANKA_TOWNS = [
    "Akkaraipattu", "Akuressa", "Alawwa", "Ambalangoda", "Ambalantota", "Ampara",
    "Anuradhapura", "Avissawella", "Badulla", "Balangoda", "Bandarawela",
    "Batticaloa", "Beruwala", "Bibile", "Chavakachcheri", "Chilaw", "Colombo",
    "Dambulla", "Dehiwala-Mount Lavinia", "Deniyaya", "Dickwella", "Eheliyagoda",
    "Elpitiya", "Embilipitiya", "Galle", "Gampaha", "Gampola", "Hambantota",
    "Hatton", "Hikkaduwa", "Homagama", "Horana", "Ja-Ela", "Jaffna", "Kadugannawa",
    "Kaduwela", "Kalmunai", "Kalutara", "Kandy", "Kegalle", "Kekirawa",
    "Kelaniya", "Kilinochchi", "Kinniya", "Kolonnawa", "Kuliyapitiya",
    "Kurunegala", "Maharagama", "Mahiyanganaya", "Malabe", "Mannar", "Matale",
    "Matara", "Mawanella", "Medawachchiya", "Minuwangoda", "Mirigama", "Monaragala",
    "Moratuwa", "Mullaitivu", "Nawalapitiya", "Negombo", "Nittambuwa",
    "Nuwara Eliya", "Padukka", "Panadura", "Peliyagoda", "Pilimathalawa",
    "Point Pedro", "Polonnaruwa", "Puttalam", "Ratnapura", "Ruwanwella",
    "Seeduwa", "Sri Jayawardenepura Kotte", "Tangalle", "Thalawakele",
    "Trincomalee", "Vavuniya", "Wadduwa", "Waskaduwa", "Wattala", "Weligama",
    "Wellawaya", "Wennappuwa",
];
