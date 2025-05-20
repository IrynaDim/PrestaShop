export class PriceParser {
    /**
     * Parses a price string and converts it to a float number.
     *
     * This method removes any non-numeric characters except for comma `,` and dot `.`,
     * then converts comma to dot (for European-style decimals), and parses the result as a float.
     *
     * Useful for price formats like "€34,80" or "$1,299.99".
     *
     * @param {string | null | undefined} rawText
     * @returns {number}
     */
    static parse(rawText) {
        if (!rawText) return 0;
        return parseFloat(
            rawText.replace(/[^\d.,]/g, '').replace(',', '.') || '0'
        );
    }

    /**
     * Parses a discount string and converts it to a float number.
     *
     * This method removes all non-numeric characters except the decimal point.
     * Useful for extracting numeric discount values from strings like "-20%" or "Save 15.5%".
     *
     * @param {string | null | undefined} rawDiscount
     * @returns {number}
     */
    static parseDiscount(rawDiscount) {
        if (!rawDiscount) return 0;
        return parseFloat(
            rawDiscount.replace(/[^\d.]/g, '') || '0'
        );
    }
}