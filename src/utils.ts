export const calculateAge = (birthdate: Date): number => {
    var ageDifMs = Date.now() - birthdate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const padAmount = (amount: number | undefined) => {
    if (amount && isNaN(amount)) {
        return amount?.toFixed(2);
    }
};
