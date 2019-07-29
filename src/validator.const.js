const CONSONANT_LIST = 'B-DF-HJ-NP-TV-Z';
const VOWEL_LIST = 'AEIOU';
const OMOCODE_NUMBER_LIST = '\\dLMNP-V';
const OMOCODE_NON_ZERO_NUMBER_LIST = '1-9MNP-V';
const OMOCODE_ZERO_LIST = '0L';
const MONTH_LIST = 'A-EHLMPR-T';
const MONTH_30DAYS_LIST = 'DHPS';
const MONTH_31DAYS_LIST = 'ACELMRT';
const CITY_CODE_LIST = 'A-M';
const COUNTRY_CODE_LIST = 'Z';

const NAME_MATCHER = `[A-Z][${VOWEL_LIST}][${VOWEL_LIST}X]|[${CONSONANT_LIST}]{2}[A-Z]`;
const SURNAME_MATCHER = NAME_MATCHER;
const FULL_NAME_MATCHER = `(?:${NAME_MATCHER}){2}`;

const YEAR_MATCHER = `[${OMOCODE_NUMBER_LIST}]{2}`;
const LEAP_YEAR_MATCHER = '[02468LNQSU][048LQU]|[13579MPRTV][26NS]';
const MONTH_MATCHER = `[${MONTH_LIST}]`;
const DAY_2X_MATCHER = '[26NS]';
const DAY_3X_MATCHER = '[37PT]';
const DAY_29_MATCHER = `[${OMOCODE_ZERO_LIST}4Q][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[1256MNRS][${OMOCODE_NUMBER_LIST}]`;
const DAY_30_MATCHER = `[${DAY_3X_MATCHER}][${OMOCODE_ZERO_LIST}]`;
const DAY_31_MATCHER = `[${DAY_3X_MATCHER}][${OMOCODE_ZERO_LIST}1M]`;

const DAY_MATCHER = `(?:${DAY_29_MATCHER}|${DAY_3X_MATCHER}[${OMOCODE_ZERO_LIST}1M])`;
const MALE_DAY_MATCHER = `(?:[${OMOCODE_ZERO_LIST}][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[12MN][${OMOCODE_NUMBER_LIST}]|[3P][${OMOCODE_ZERO_LIST}1M])`;
const FEMALE_DAY_MATCHER = `(?:[4Q][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[56RS][${OMOCODE_NUMBER_LIST}]|[7T][${OMOCODE_ZERO_LIST}1M])`;
const MONTH_DAY_MATCHER = `${MONTH_MATCHER}(?:${DAY_29_MATCHER})|[${MONTH_30DAYS_LIST}]${DAY_30_MATCHER}|[${MONTH_31DAYS_LIST}]${DAY_31_MATCHER}`;
const FULL_DATE_MATCHER = `${YEAR_MATCHER}(?:${MONTH_MATCHER}(?:[${OMOCODE_ZERO_LIST}4Q][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[15MR][${OMOCODE_NUMBER_LIST}]|${DAY_2X_MATCHER}[0-8LMNP-U])|[${MONTH_30DAYS_LIST}]${DAY_3X_MATCHER}[${OMOCODE_ZERO_LIST}]|[${MONTH_31DAYS_LIST}]${DAY_3X_MATCHER}[${OMOCODE_ZERO_LIST}1M]|[${MONTH_30DAYS_LIST}${MONTH_31DAYS_LIST}]${DAY_2X_MATCHER}[9V])|(?:${LEAP_YEAR_MATCHER})B${DAY_2X_MATCHER}[9V]`;
const MALE_FULL_DATE_MATCHER = `${YEAR_MATCHER}(?:${MONTH_MATCHER}(?:[${OMOCODE_ZERO_LIST}4Q][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[1M][${OMOCODE_NUMBER_LIST}]|[2N][0-8LMNP-U])|[${MONTH_30DAYS_LIST}][3P][${OMOCODE_ZERO_LIST}]|[${MONTH_31DAYS_LIST}][3P][${OMOCODE_ZERO_LIST}1M]|[${MONTH_30DAYS_LIST}${MONTH_31DAYS_LIST}][2N][9V])|(?:${LEAP_YEAR_MATCHER})B[2N][9V]`;
const FEMALE_FULL_DATE_MATCHER = `${YEAR_MATCHER}(?:${MONTH_MATCHER}(?:[${OMOCODE_ZERO_LIST}4Q][${OMOCODE_NON_ZERO_NUMBER_LIST}]|[5R][${OMOCODE_NUMBER_LIST}]|[6S][0-8LMNP-U])|[${MONTH_30DAYS_LIST}][7T][${OMOCODE_ZERO_LIST}]|[${MONTH_31DAYS_LIST}][7T][${OMOCODE_ZERO_LIST}1M]|[${MONTH_30DAYS_LIST}${MONTH_31DAYS_LIST}][6S][9V])|(?:${LEAP_YEAR_MATCHER})B[6S][9V]`;

const CITY_CODE_MATCHER = `[${CITY_CODE_LIST}](?:[${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]{2}|[${OMOCODE_ZERO_LIST}](?:[${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]|[${OMOCODE_ZERO_LIST}][${OMOCODE_NON_ZERO_NUMBER_LIST}]))`;
const COUNTRY_CODE_MATCHER = `${COUNTRY_CODE_LIST}[${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]{2}`;
const BELFIORE_CODE_MATCHER = `[${CITY_CODE_LIST}${COUNTRY_CODE_LIST}][${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]{2}|[${COUNTRY_CODE_LIST}][${OMOCODE_ZERO_LIST}](?:[${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]|[${OMOCODE_ZERO_LIST}][${OMOCODE_NON_ZERO_NUMBER_LIST}])`;

const CHECK_DIGIT = '[A-Z]';

const CODICE_FISCALE = `${FULL_NAME_MATCHER}(?:${FULL_DATE_MATCHER})(?:${BELFIORE_CODE_MATCHER})${CHECK_DIGIT}`;


const PARTIAL_NAME_MATCHER = `[A-Z][${VOWEL_LIST}]?|[${CONSONANT_LIST}]{1,2}`;
const PARTIAL_FULL_NAME = `(?:${PARTIAL_NAME_MATCHER})|(?:(?:${NAME_MATCHER})(?:${PARTIAL_NAME_MATCHER})?)`;
const PARTIAL_YEAR = `[${OMOCODE_NUMBER_LIST}]`;
const PARTIAL_MONTH_DAY = `${MONTH_MATCHER}[${OMOCODE_ZERO_LIST}12456MNQRS]?|[${MONTH_30DAYS_LIST}${MONTH_31DAYS_LIST}]${DAY_3X_MATCHER}`;
const PARTIAL_FULL_DATE =`${PARTIAL_YEAR}|(?:${YEAR_MATCHER}(?:${PARTIAL_MONTH_DAY})?)`;
const PARTIAL_BELFIORE_CODE_MATCHER = `[${CITY_CODE_LIST}${COUNTRY_CODE_LIST}](?:[${OMOCODE_NON_ZERO_NUMBER_LIST}][${OMOCODE_NUMBER_LIST}]?)?|[${COUNTRY_CODE_LIST}](?:[${OMOCODE_ZERO_LIST}][${OMOCODE_NUMBER_LIST}]?)?`;

const PARTIAL_CF = `${PARTIAL_FULL_NAME}|(?:${FULL_NAME_MATCHER}(?:(?:${PARTIAL_FULL_DATE})|(?:${FULL_DATE_MATCHER})(?:(?:${PARTIAL_BELFIORE_CODE_MATCHER})|(?:${BELFIORE_CODE_MATCHER})${CHECK_DIGIT}?)?)?)?`;

/**
 * Validator constants
 * @readonly
 * @returns {Object} VALIDATOR
 * 
 * @constant {string} VALIDATOR.CONSONANT_LIST List of consonant to be used in a RegExp
 * @constant {string} VALIDATOR.VOWEL_LIST List of vowels to be used in a RegExp
 * @constant {string} VALIDATOR.OMOCODE_NUMBER_LIST List of numbers and their omocode counterparts to be used in a RegExp
 * @constant {string} VALIDATOR.OMOCODE_NON_ZERO_NUMBER_LIST List of numbers but 0 and their omocode counterparts to be used in a RegExp
 * @constant {string} VALIDATOR.OMOCODE_ZERO_LIST List of 0 and its omocode counterpart to be used in a RegExp
 * @constant {string} VALIDATOR.MONTH_LIST
 * @constant {string} VALIDATOR.MONTH_30DAYS_LIST
 * @constant {string} VALIDATOR.MONTH_31DAYS_LIST
 * @constant {string} VALIDATOR.CITY_CODE_LIST
 * @constant {string} VALIDATOR.COUNTRY_CODE_LIST
 * @constant {string} VALIDATOR.NAME_MATCHER
 * @constant {string} VALIDATOR.SURNAME_MATCHER
 * @constant {string} VALIDATOR.FULL_NAME_MATCHER
 * @constant {string} VALIDATOR.YEAR_MATCHER
 * @constant {string} VALIDATOR.LEAP_YEAR_MATCHER
 * @constant {string} VALIDATOR.MONTH_MATCHER
 * @constant {string} VALIDATOR.DAY_29_MATCHER
 * @constant {string} VALIDATOR.DAY_30_MATCHER
 * @constant {string} VALIDATOR.DAY_31_MATCHER
 * @constant {string} VALIDATOR.DAY_MATCHER
 * @constant {string} VALIDATOR.MALE_DAY_MATCHER
 * @constant {string} VALIDATOR.FEMALE_DAY_MATCHER
 * @constant {string} VALIDATOR.MONTH_DAY_MATCHER
 * @constant {string} VALIDATOR.FULL_DATE_MATCHER
 * @constant {string} VALIDATOR.MALE_FULL_DATE_MATCHER
 * @constant {string} VALIDATOR.FEMALE_FULL_DATE_MATCHER
 * @constant {string} VALIDATOR.CITY_CODE_MATCHER
 * @constant {string} VALIDATOR.COUNTRY_CODE_MATCHER
 * @constant {string} VALIDATOR.BELFIORE_CODE_MATCHER
 * @constant {string} VALIDATOR.CHECK_DIGIT
 * @constant {string} VALIDATOR.CODICE_FISCALE
 * @constant {string} VALIDATOR.PARTIAL_NAME_MATCHER
 * @constant {string} VALIDATOR.PARTIAL_FULL_NAME
 * @constant {string} VALIDATOR.PARTIAL_YEAR
 * @constant {string} VALIDATOR.PARTIAL_MONTH_DAY
 * @constant {string} VALIDATOR.PARTIAL_FULL_DATE
 * @constant {string} VALIDATOR.PARTIAL_BELFIORE_CODE_MATCHER
 * @constant {string} VALIDATOR.PARTIAL_CF
 * 
 * @namespace VALIDATOR
 */
module.exports = Object.freeze({
    CONSONANT_LIST,
    VOWEL_LIST,
    OMOCODE_NUMBER_LIST,
    OMOCODE_NON_ZERO_NUMBER_LIST,
    OMOCODE_ZERO_LIST,
    MONTH_LIST,
    MONTH_30DAYS_LIST,
    MONTH_31DAYS_LIST,
    CITY_CODE_LIST,
    COUNTRY_CODE_LIST,
    NAME_MATCHER,
    SURNAME_MATCHER,
    FULL_NAME_MATCHER,
    YEAR_MATCHER,
    LEAP_YEAR_MATCHER,
    MONTH_MATCHER,
    DAY_29_MATCHER,
    DAY_30_MATCHER,
    DAY_31_MATCHER,
    DAY_MATCHER,
    MALE_DAY_MATCHER,
    FEMALE_DAY_MATCHER,
    MONTH_DAY_MATCHER,
    FULL_DATE_MATCHER,
    MALE_FULL_DATE_MATCHER,
    FEMALE_FULL_DATE_MATCHER,
    CITY_CODE_MATCHER,
    COUNTRY_CODE_MATCHER,
    BELFIORE_CODE_MATCHER,
    CHECK_DIGIT,
    CODICE_FISCALE,
    PARTIAL_NAME_MATCHER,
    PARTIAL_FULL_NAME,
    PARTIAL_YEAR,
    PARTIAL_MONTH_DAY,
    PARTIAL_FULL_DATE,
    PARTIAL_BELFIORE_CODE_MATCHER,
    PARTIAL_CF
});