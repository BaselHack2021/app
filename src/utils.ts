export const calculateAge = (birthdate: Date): number => {
    var ageDifMs = Date.now() - birthdate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};
